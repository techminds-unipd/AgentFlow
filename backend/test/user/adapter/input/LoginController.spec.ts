import { Test, TestingModule } from '@nestjs/testing';
import User from 'src/user/domain/User';
import UserDTO from 'src/user/adapter/input/UserDTO';
import { JwtService } from '@nestjs/jwt';
import { LOGIN_USE_CASE } from 'src/user/service/port/input/LoginUseCase';
import LoginController from 'src/user/adapter/input/LoginController';
import { MongooseError } from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserNotFoundError, WrongPasswordError } from 'src/BusinessErrors';

describe('LoginController', () => {
    let loginController: LoginController;
    let jwtService: { signAsync: jest.Mock };
    let loginUseCaseMock: { login: jest.Mock };

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LoginController],
            providers: [
                {
                    provide: LOGIN_USE_CASE,
                    useValue: loginUseCaseMock,
                },
                {
                    provide: JwtService,
                    useValue: jwtService,
                },
            ],
        }).compile();
        loginController = module.get<LoginController>(LoginController);
    };

    beforeEach(async () => {
        loginUseCaseMock = {
            login: jest.fn(),
        };
        jwtService = {
            signAsync: jest.fn(),
        };
        await createTestingModule();
    });

    describe('login', () => {
        it('should login the user', async () => {
            loginUseCaseMock.login.mockResolvedValue(new User("Gianni", "Testing1234"));
            jwtService.signAsync.mockResolvedValue("mockToken");
            expect(await loginController.login(new UserDTO("Gianni", "Testing1234"))).toEqual({"accessToken": "mockToken"});
        });

        it('should throw HttpException because the database throws an exception', async () => {
            loginUseCaseMock.login.mockImplementation(() => {
                throw new MongooseError("");
            });
            try {
                await loginController.login(new UserDTO("Gianni", "Testing1234"));
            } catch (err) {
                expect(err).toBeInstanceOf(HttpException);
                expect(err.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });

        it('should throw HttpException because the username was not found in the database', async () => {
            loginUseCaseMock.login.mockImplementation(() => {
                throw new UserNotFoundError();
            });
            try {
                await loginController.login(new UserDTO("Gianni", "Testing1234"));
            } catch (err) {
                expect(err).toBeInstanceOf(HttpException);
                expect(err.status).toBe(HttpStatus.BAD_REQUEST);
            }
        });

        it('should throw HttpException because password doesn\'t match', async () => {
            loginUseCaseMock.login.mockImplementation(() => {
                throw new WrongPasswordError();
            });
            try {
                await loginController.login(new UserDTO("Gianni", "Testing1234"));
            } catch (err) {
                expect(err).toBeInstanceOf(HttpException);
                expect(err.status).toBe(HttpStatus.BAD_REQUEST);
            }
        });
    });
});

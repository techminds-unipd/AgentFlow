import { Test, TestingModule } from '@nestjs/testing';
import User from 'src/user/domain/User';
import UserDTO from 'src/user/adapter/input/UserDTO';
import RegisterUserController from 'src/user/adapter/input/RegisterUserController';
import { REGISTER_USER_USE_CASE } from 'src/user/service/port/input/RegisterUserUseCase';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserAlreadyExistsError } from 'src/BusinessErrors';
import { MongooseError } from 'mongoose';

describe('RegisterUserController', () => {
    let registerUserController: RegisterUserController;
    let registerUseCaseMock: { registerUser: jest.Mock };
    const userMock = new User('Gianni', 'Testing1234');
    const userDTOMock = new UserDTO('Gianni', 'Testing1234');

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RegisterUserController],
            providers: [
                {
                    provide: REGISTER_USER_USE_CASE,
                    useValue: registerUseCaseMock,
                },
            ],
        }).compile();
        registerUserController = module.get<RegisterUserController>(
            RegisterUserController,
        );
    };

    beforeEach(async () => {
        registerUseCaseMock = {
            registerUser: jest.fn(),
        };
        await createTestingModule();
    });

    describe('registerUser', () => {
        it('should register the user', async () => {
            registerUseCaseMock.registerUser.mockResolvedValue(userMock);
            expect(
                await registerUserController.registerUser(userDTOMock),
            ).toEqual(userDTOMock);
        });

        it('should throw HttpException because the database throws an exception', async () => {
            registerUseCaseMock.registerUser.mockImplementation(() => {
                throw new MongooseError('');
            });
            try {
                await registerUserController.registerUser(userDTOMock);
            } catch (err) {
                expect(err).toBeInstanceOf(HttpException);
                expect(err.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });

        it('should throw HttpException because username already exists', async () => {
            registerUseCaseMock.registerUser.mockImplementation(() => {
                throw new UserAlreadyExistsError();
            });
            try {
                await registerUserController.registerUser(userDTOMock);
            } catch (err) {
                expect(err).toBeInstanceOf(HttpException);
                expect(err.status).toBe(HttpStatus.BAD_REQUEST);
            }
        });
    });
});

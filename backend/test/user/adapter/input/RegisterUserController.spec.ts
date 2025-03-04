import { Test, TestingModule } from '@nestjs/testing';
import User from 'src/user/domain/User';
import UserDTO from 'src/user/adapter/input/UserDTO';
import RegisterUserController from 'src/user/adapter/input/RegisterUserController';
import { REGISTER_USER_USE_CASE } from 'src/user/service/port/input/RegisterUserUseCase';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('RegisterUserController', () => {
    let registerUserController: RegisterUserController;

    describe('registerUser', () => {
        it('should register the user', async () => {
            const registerUseCaseMock = {
                registerUser: jest.fn().mockResolvedValue(new User("Gianni", "Testing1234")),
            };
            const module: TestingModule = await Test.createTestingModule({
                controllers: [RegisterUserController],
                providers: [
                    {
                        provide: REGISTER_USER_USE_CASE,
                        useValue: registerUseCaseMock,
                    },
                ],
            }).compile();
            registerUserController = module.get<RegisterUserController>(RegisterUserController);
            expect(await registerUserController.registerUser(new UserDTO("Gianni", "Testing1234"))).toEqual(new UserDTO("Gianni", "Testing1234"));
        });

        it('should throw HttpException because username already exists', async () => {
            const registerUseCaseMock = {
                registerUser: jest.fn().mockImplementation(() => {throw new Error('User already exists')}),
            };
            const module: TestingModule = await Test.createTestingModule({
                controllers: [RegisterUserController],
                providers: [
                    {
                        provide: REGISTER_USER_USE_CASE,
                        useValue: registerUseCaseMock,
                    },
                ],
            }).compile();
            registerUserController = module.get<RegisterUserController>(RegisterUserController);
            try {
                await registerUserController.registerUser(new UserDTO("Gianni", "Testing1234"))
            } catch (err) {
                expect(err).toBeInstanceOf(HttpException);
                expect(err.message).toBe("TODO: qua arrivano errori di business e db");
                expect(err.status).toBe(HttpStatus.BAD_REQUEST);
            }
        });
    });
    
});

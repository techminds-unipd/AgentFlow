import { Test, TestingModule } from '@nestjs/testing';
import User from 'src/user/domain/User';
import RegisterUserService from 'src/user/service/RegisterUserService';
import { GET_USER_PORT } from 'src/user/service/port/output/GetUserPort';
import { REGISTER_USER_PORT } from 'src/user/service/port/output/RegisterUserPort';
import { UserAlreadyExistsError } from 'src/BusinessErrors';

describe('RegisterUserService', () => {
    let registerUserService: RegisterUserService;

    describe('registerUser', () => {
        it('should register the user', async () => {
            const registerUserPortMock = {
                registerUser: jest.fn().mockResolvedValue(new User("Gianni", "Testing1234")),
            };
            const getUserPortMock = {
                getUserByUsername: jest.fn().mockResolvedValue(null),
            };
            const module: TestingModule = await Test.createTestingModule({
                providers: [
                    RegisterUserService,
                    {
                        provide: GET_USER_PORT,
                        useValue: getUserPortMock,
                    },
                    {
                        provide: REGISTER_USER_PORT,
                        useValue: registerUserPortMock,
                    },
                ],
            }).compile();
            registerUserService = module.get<RegisterUserService>(RegisterUserService);
            expect(await registerUserService.registerUser(new User("Gianni", "Testing1234"))).toEqual(new User("Gianni", "Testing1234"));
        });
    });

    describe('registerUser', () => {
        it('should register the user', async () => {
            const registerUserPortMock = {
                registerUser: jest.fn().mockResolvedValue(new User("Gianni", "Testing1234")),
            };
            const getUserPortMock = {
                getUserByUsername: jest.fn().mockResolvedValue(new User("Gianni", "Testing1234")),
            };
            const module: TestingModule = await Test.createTestingModule({
                providers: [
                    RegisterUserService,
                    {
                        provide: GET_USER_PORT,
                        useValue: getUserPortMock,
                    },
                    {
                        provide: REGISTER_USER_PORT,
                        useValue: registerUserPortMock,
                    },
                ],
            }).compile();
            registerUserService = module.get<RegisterUserService>(RegisterUserService);

            try {
                await registerUserService.registerUser(new User("Gianni", "Testing1234"))
            } catch (err) {
                expect(err).toBeInstanceOf(UserAlreadyExistsError);
            }
        });
    });
});

import { Test, TestingModule } from '@nestjs/testing';
import User from 'src/user/domain/User';
import RegisterUserService from 'src/user/service/RegisterUserService';
import { GET_USER_PORT } from 'src/user/service/port/output/GetUserPort';
import { REGISTER_USER_PORT } from 'src/user/service/port/output/RegisterUserPort';
import { UserAlreadyExistsError } from 'src/BusinessErrors';

describe('RegisterUserService', () => {
    let registerUserService: RegisterUserService;
    let registerUserPortMock: { registerUser: jest.Mock };
    let getUserPortMock: { getUserByUsername: jest.Mock };

    const createTestingModule = async () => {
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
    };

    beforeEach(async () => {
        getUserPortMock = {
            getUserByUsername: jest.fn(),
        };
        registerUserPortMock = {
            registerUser: jest.fn(),
        };
        await createTestingModule();
    });

    describe('registerUser', () => {
        it('should register the user', async () => {
            registerUserPortMock.registerUser.mockResolvedValue(new User("Gianni", "Testing1234"));
            getUserPortMock.getUserByUsername.mockResolvedValue(null);
            expect(await registerUserService.registerUser(new User("Gianni", "Testing1234"))).toEqual(new User("Gianni", "Testing1234"));
        });
    });

    describe('registerUser', () => {
        it('should not register the user because the username is already taken', async () => {
            registerUserPortMock.registerUser.mockResolvedValue(new User("Gianni", "Testing1234"));
            getUserPortMock.getUserByUsername.mockResolvedValue(new User("Gianni", "Testing1234"));
            try {
                await registerUserService.registerUser(new User("Gianni", "Testing1234"))
            } catch (err) {
                expect(err).toBeInstanceOf(UserAlreadyExistsError);
            }
        });
    });
});

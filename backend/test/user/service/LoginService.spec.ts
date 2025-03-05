import { Test, TestingModule } from '@nestjs/testing';
import User from 'src/user/domain/User';
import { GET_USER_PORT } from 'src/user/service/port/output/GetUserPort';
import LoginService from 'src/user/service/LoginService';
import { UserNotFoundError, WrongPasswordError } from 'src/BusinessErrors';

describe('LoginService', () => {
    let loginService: LoginService;
    let getUserPortMock: { getUserByUsername: jest.Mock };

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LoginService,
                {
                    provide: GET_USER_PORT,
                    useValue: getUserPortMock,
                },
            ],
        }).compile();
        loginService = module.get<LoginService>(LoginService);
    };

    beforeEach(async () => {
        getUserPortMock = {
            getUserByUsername: jest.fn(),
        };
        await createTestingModule();
    });

    describe('login', () => {
        it('should login the user', async () => {
            const userDB = await new User("Gianni", "Testing1234").hashPassword();
            getUserPortMock.getUserByUsername.mockResolvedValue(userDB);
            expect(await loginService.login(new User("Gianni", "Testing1234"))).toEqual(userDB);
        });

        it('shouldn\'t login the user because the username was not found in the database', async () => {
            getUserPortMock.getUserByUsername.mockResolvedValue(null);
            try {
                await loginService.login(new User("Gianni", "Testing1234"));
            }
            catch (err) {
                expect(err).toBeInstanceOf(UserNotFoundError);
            }
        });

        it('shouldn\'t login the user because password doesn\'t match', async () => {
            const userDB = await new User("Gianni", "Testing123").hashPassword();
            getUserPortMock.getUserByUsername.mockResolvedValue(userDB);
            try {
                await loginService.login(new User("Gianni", "Testing1234"));
            }
            catch (err) {
                expect(err).toBeInstanceOf(WrongPasswordError);
            }
        });
    });

});

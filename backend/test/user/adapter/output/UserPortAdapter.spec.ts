import { Test, TestingModule } from '@nestjs/testing';
import User from 'src/user/domain/User';
import UserPortAdapter from 'src/user/adapter/output/UserPortAdapter';
import { UserEntity } from 'src/user/adapter/output/UserEntity';
import { UserRepository } from 'src/user/adapter/output/UserRepository';

describe('UserPortAdapter', () => {
    let userPortAdapter: UserPortAdapter;
    let userRepositoryMock: { getUserByUsername: jest.Mock, registerUser: jest.Mock };

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserPortAdapter,
                {
                    provide: UserRepository,
                    useValue: userRepositoryMock,
                },
            ],
        }).compile();
        userPortAdapter = module.get<UserPortAdapter>(UserPortAdapter);
    };

    beforeEach(async () => {
        userRepositoryMock = {
            getUserByUsername: jest.fn(),
            registerUser: jest.fn(),
        };
        await createTestingModule();
    });

    describe('getUserByUsername', () => {
        it('should return the user that has the input username', async () => {
            userRepositoryMock.getUserByUsername.mockResolvedValue({username: "Gianni", password: "Testing1234", workflows: []} as UserEntity);
            expect(await userPortAdapter.getUserByUsername("Gianni")).toEqual(new User("Gianni", "Testing1234"));
        });
    });

    describe('getUserByUsername', () => {
        it('should return null if the user doesn\'t exists', async () => {
            userRepositoryMock.getUserByUsername.mockResolvedValue(null);
            expect(await userPortAdapter.getUserByUsername("Gianni")).toEqual(null);
        });
    });

    describe('registerUser', () => {
        it('should return the registered user', async () => {
            userRepositoryMock.registerUser.mockResolvedValue({username: "Gianni", password: "Testing1234", workflows: []} as UserEntity);
            expect(await userPortAdapter.registerUser(new User("Gianni", "Testing1234"))).toEqual(new User("Gianni", "Testing1234"));
        });
    });

});

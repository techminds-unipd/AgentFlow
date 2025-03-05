import { Test, TestingModule } from '@nestjs/testing';
import User from 'src/user/domain/User';
import UserPortAdapter from 'src/user/adapter/output/UserPortAdapter';
import { UserEntity } from 'src/user/adapter/output/UserEntity';
import { UserRepository } from 'src/user/adapter/output/UserRepository';

describe('UserPortAdapter', () => {
    let userPortAdapter: UserPortAdapter;

    describe('getUserByUsername', () => {
        it('should return the user that has the input username', async () => {
            const userRepositoryMock = {
                getUserByUsername: jest.fn().mockResolvedValue({username: "Gianni", password: "Testing1234", workflows: []} as UserEntity),
            };
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
            expect(await userPortAdapter.getUserByUsername("Gianni")).toEqual(new User("Gianni", "Testing1234"));
        });
    });

    describe('getUserByUsername', () => {
        it('should return null if the user doesn\'t exists', async () => {
            const userRepositoryMock = {
                getUserByUsername: jest.fn().mockResolvedValue(null),
            };
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
            expect(await userPortAdapter.getUserByUsername("Gianni")).toEqual(null);
        });
    });

    describe('registerUser', () => {
        it('should return the registered user', async () => {
            const userRepositoryMock = {
                registerUser: jest.fn().mockResolvedValue({username: "Gianni", password: "Testing1234", workflows: []} as UserEntity),
            };
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
            expect(await userPortAdapter.registerUser(new User("Gianni", "Testing1234"))).toEqual(new User("Gianni", "Testing1234"));
        });
    });

});

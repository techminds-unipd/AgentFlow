import { Test, TestingModule } from "@nestjs/testing";
import User from "src/user/domain/User";
import UserPortAdapter from "src/user/adapter/output/UserPortAdapter";
import { UserEntity } from "src/user/adapter/output/UserEntity";
import { UserRepository } from "src/user/adapter/output/UserRepository";

describe("UserPortAdapter", () => {
    let userPortAdapter: UserPortAdapter;
    let userRepositoryMock: { getUserByUsername: jest.Mock; registerUser: jest.Mock };
    const userMock = new User("Gianni", "Testing1234");
    const userEntityMock: UserEntity = { username: "Gianni", password: "Testing1234", workflows: [] };

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserPortAdapter, { provide: UserRepository, useValue: userRepositoryMock }]
        }).compile();
        userPortAdapter = module.get<UserPortAdapter>(UserPortAdapter);
    };

    beforeEach(async () => {
        userRepositoryMock = { getUserByUsername: jest.fn(), registerUser: jest.fn() };
        await createTestingModule();
    });

    describe("getUserByUsername", () => {
        it("TUB13 - should return the user that has the input username", async () => {
            userRepositoryMock.getUserByUsername.mockResolvedValue(userEntityMock);
            expect(await userPortAdapter.getUserByUsername(userMock.username)).toEqual(userMock);
        });

        it("TUB14 - should return null if the user doesn't exists", async () => {
            userRepositoryMock.getUserByUsername.mockResolvedValue(null);
            expect(await userPortAdapter.getUserByUsername(userMock.username)).toEqual(null);
        });
    });

    describe("registerUser", () => {
        it("TUB15 - should return the registered user", async () => {
            userRepositoryMock.registerUser.mockResolvedValue(userEntityMock);
            expect(await userPortAdapter.registerUser(userMock)).toEqual(userMock);
        });
    });
});

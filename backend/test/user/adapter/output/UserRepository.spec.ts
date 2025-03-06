import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model } from "mongoose";
import { UserEntity } from "src/user/adapter/output/UserEntity";
import { UserRepository } from "src/user/adapter/output/UserRepository";
import User from "src/user/domain/User";

describe("UserRepository", () => {
    let userRepository: UserRepository;
    let userEntityModelMock: { findOne: jest.Mock; create: jest.Mock };
    const userEntityMock: UserEntity = { username: "Gianni", password: "Testing1234", workflows: [] };

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserRepository, { provide: getModelToken(UserEntity.name), useValue: userEntityModelMock }]
        }).compile();
        userRepository = module.get<UserRepository>(UserRepository);
    };

    beforeEach(async () => {
        userEntityModelMock = { findOne: jest.fn(), create: jest.fn() };
        await createTestingModule();
    });

    describe("getUserByUsername", () => {
        it("should return a user", async () => {
            userEntityModelMock.findOne.mockResolvedValue(userEntityMock);
            expect(await userRepository.getUserByUsername(userEntityMock.username)).toEqual(userEntityMock);
        });
    });

    describe("registerUser", () => {
        it("should return the registered user", async () => {
            userEntityModelMock.create.mockResolvedValue(userEntityMock);
            expect(await userRepository.registerUser(userEntityMock)).toEqual(userEntityMock);
        });
    });
});

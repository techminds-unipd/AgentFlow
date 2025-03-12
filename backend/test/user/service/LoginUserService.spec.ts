import { Test, TestingModule } from "@nestjs/testing";
import User from "src/user/domain/User";
import { GET_USER_PORT } from "src/user/service/port/output/GetUserPort";
import LoginUserService from "src/user/service/LoginUserService";
import { UserNotFoundError, WrongPasswordError } from "src/BusinessErrors";
import * as bcrypt from "bcrypt";

jest.mock("bcrypt", () => ({ compare: jest.fn() }));

describe("LoginUserService", () => {
    let loginUserService: LoginUserService;
    let getUserPortMock: { getUserByUsername: jest.Mock };
    const userMock = new User("Gianni", "Testing1234");

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LoginUserService, { provide: GET_USER_PORT, useValue: getUserPortMock }]
        }).compile();
        loginUserService = module.get<LoginUserService>(LoginUserService);
    };

    beforeEach(async () => {
        getUserPortMock = { getUserByUsername: jest.fn() };
        await createTestingModule();
    });

    describe("login", () => {
        it("should login the user", async () => {
            getUserPortMock.getUserByUsername.mockResolvedValue(userMock);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            expect(await loginUserService.login(userMock)).toEqual(userMock);
        });

        it("shouldn't login the user because the username was not found in the database", async () => {
            getUserPortMock.getUserByUsername.mockResolvedValue(null);
            expect(loginUserService.login(userMock)).rejects.toThrow(UserNotFoundError);
        });

        it("shouldn't login the user because password doesn't match", async () => {
            getUserPortMock.getUserByUsername.mockResolvedValue(userMock);
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);
            expect(loginUserService.login(userMock)).rejects.toThrow(WrongPasswordError);
        });
    });
});

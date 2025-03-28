import { Test, TestingModule } from "@nestjs/testing";
import User from "src/user/domain/User";
import UserDTO from "src/user/adapter/input/UserDTO";
import { JwtService } from "@nestjs/jwt";
import { LOGIN_USER_USE_CASE } from "src/user/service/port/input/LoginUserUseCase";
import LoginUserController from "src/user/adapter/input/LoginUserController";
import { MongooseError } from "mongoose";
import { HttpException, HttpStatus } from "@nestjs/common";
import { UserNotFoundError, WrongPasswordError } from "src/BusinessErrors";

describe("LoginUserController", () => {
    let loginUserController: LoginUserController;
    let jwtService: { signAsync: jest.Mock };
    let loginUseCaseMock: { login: jest.Mock };
    const userMock = new User("Gianni", "Testing1234");
    const userDTOMock = new UserDTO("Gianni", "Testing1234");
    const jwtMock = { accessToken: "mockToken" };

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LoginUserController],
            providers: [
                { provide: LOGIN_USER_USE_CASE, useValue: loginUseCaseMock },
                { provide: JwtService, useValue: jwtService }
            ]
        }).compile();
        loginUserController = module.get<LoginUserController>(LoginUserController);
    };

    beforeEach(async () => {
        loginUseCaseMock = { login: jest.fn() };
        jwtService = { signAsync: jest.fn() };
        await createTestingModule();
    });

    describe("login", () => {
        it("TUB6 - should login the user", async () => {
            loginUseCaseMock.login.mockResolvedValue(userMock);
            jwtService.signAsync.mockResolvedValue(jwtMock.accessToken);
            expect(await loginUserController.login(userDTOMock)).toEqual(jwtMock);
        });

        it("TUB7 - should throw HttpException because the database throws an exception", async () => {
            loginUseCaseMock.login.mockImplementation(() => {
                throw new MongooseError("");
            });
            const result = loginUserController.login(userDTOMock);
            expect(result).rejects.toThrow(HttpException);
            expect(result).rejects.toHaveProperty("status", HttpStatus.INTERNAL_SERVER_ERROR);
        });

        it("TUB8 - should throw HttpException because the username was not found in the database", async () => {
            loginUseCaseMock.login.mockImplementation(() => {
                throw new UserNotFoundError();
            });
            const result = loginUserController.login(userDTOMock);
            expect(result).rejects.toThrow(HttpException);
            expect(result).rejects.toHaveProperty("status", HttpStatus.UNAUTHORIZED);
        });

        it("TUB9 - should throw HttpException because password doesn't match", async () => {
            loginUseCaseMock.login.mockImplementation(() => {
                throw new WrongPasswordError();
            });
            const result = loginUserController.login(userDTOMock);
            expect(result).rejects.toThrow(HttpException);
            expect(result).rejects.toHaveProperty("status", HttpStatus.UNAUTHORIZED);
        });
    });
});

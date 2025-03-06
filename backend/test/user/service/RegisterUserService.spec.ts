import { Test, TestingModule } from "@nestjs/testing";
import User from "src/user/domain/User";
import RegisterUserService from "src/user/service/RegisterUserService";
import { GET_USER_PORT } from "src/user/service/port/output/GetUserPort";
import { REGISTER_USER_PORT } from "src/user/service/port/output/RegisterUserPort";
import { UserAlreadyExistsError } from "src/BusinessErrors";

describe("RegisterUserService", () => {
    let registerUserService: RegisterUserService;
    let registerUserPortMock: { registerUser: jest.Mock };
    let getUserPortMock: { getUserByUsername: jest.Mock };
    const userMock = new User("Gianni", "Testing1234");

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RegisterUserService,
                { provide: GET_USER_PORT, useValue: getUserPortMock },
                { provide: REGISTER_USER_PORT, useValue: registerUserPortMock }
            ]
        }).compile();
        registerUserService = module.get<RegisterUserService>(RegisterUserService);
    };

    beforeEach(async () => {
        getUserPortMock = { getUserByUsername: jest.fn() };
        registerUserPortMock = { registerUser: jest.fn() };
        await createTestingModule();
    });

    describe("registerUser", () => {
        it("should register the user", async () => {
            registerUserPortMock.registerUser.mockResolvedValue(userMock);
            getUserPortMock.getUserByUsername.mockResolvedValue(null);
            expect(await registerUserService.registerUser(userMock)).toEqual(userMock);
        });
    });

    describe("registerUser", () => {
        it("should not register the user because the username is already taken", async () => {
            registerUserPortMock.registerUser.mockResolvedValue(userMock);
            getUserPortMock.getUserByUsername.mockResolvedValue(userMock);
            try {
                await registerUserService.registerUser(userMock);
            } catch (err) {
                expect(err).toBeInstanceOf(UserAlreadyExistsError);
            }
        });
    });
});

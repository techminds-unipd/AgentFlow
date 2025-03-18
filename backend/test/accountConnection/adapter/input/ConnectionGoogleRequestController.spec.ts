import { Test, TestingModule } from "@nestjs/testing";
import ConnectionGoogleRequestController from "src/accountConnection/adapter/input/ConnectionGoogleRequestController";
import { CONNECTION_GOOGLE_REQUEST_USE_CASE } from "src/accountConnection/service/port/input/ConnectionGoogleRequestUseCase";
import { HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

describe("ConnectionGoogleRequestController", () => {
    let connectionGoogleRequestController: ConnectionGoogleRequestController;
    let connectionGoogleRequestUseCaseMock: { googleAuth: jest.Mock };
    let jwtService: { verifyAsync: jest.Mock };

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ConnectionGoogleRequestController],
            providers: [
                { provide: CONNECTION_GOOGLE_REQUEST_USE_CASE, useValue: connectionGoogleRequestUseCaseMock },
                { provide: JwtService, useValue: jwtService }
            ]
        }).compile();
        connectionGoogleRequestController = module.get<ConnectionGoogleRequestController>(ConnectionGoogleRequestController);
    };

    beforeEach(async () => {
        connectionGoogleRequestUseCaseMock = { googleAuth: jest.fn() };
        jwtService = { verifyAsync: jest.fn() };
        await createTestingModule();
    });

    describe("googleAuth", () => {
        it("should create a redirect url for google auth", async () => {
            connectionGoogleRequestUseCaseMock.googleAuth.mockReturnValue("redirectUrl");
            expect(connectionGoogleRequestController.googleAuth()).toEqual({url: "redirectUrl"});
        });
    });
});

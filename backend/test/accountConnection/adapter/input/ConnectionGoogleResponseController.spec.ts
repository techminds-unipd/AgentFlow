import { Test, TestingModule } from "@nestjs/testing";
import { HttpException, HttpStatus } from "@nestjs/common";
import ConnectionGoogleResponseController from "src/accountConnection/adapter/input/ConnectionGoogleResponseController";
import { CONNECTION_GOOGLE_RESPONSE_USE_CASE } from "src/accountConnection/service/port/input/ConnectionGoogleResponseUseCase";
import TokenDTO from "src/accountConnection/adapter/input/TokenDTO";
import Token from "src/accountConnection/domain/Token";

describe("ConnectionGoogleResponseController", () => {
    let connectionGoogleResponseController: ConnectionGoogleResponseController;
    let connectionGoogleResponseUseCaseMock: { getToken: jest.Mock };
    const tokenMock = new Token("token", "refresh", new Date())
    const tokenDTOMock = new TokenDTO("token", "refresh", tokenMock.expireDate);

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ConnectionGoogleResponseController],
            providers: [
                { provide: CONNECTION_GOOGLE_RESPONSE_USE_CASE, useValue: connectionGoogleResponseUseCaseMock },
            ]
        }).compile();
        connectionGoogleResponseController = module.get<ConnectionGoogleResponseController>(ConnectionGoogleResponseController);
    };

    beforeEach(async () => {
        connectionGoogleResponseUseCaseMock = { getToken: jest.fn() };
        await createTestingModule();
    });

    describe("googleAuthCallback", () => {
        it("should return the TokenDTO acquired in the callback", async () => {
            connectionGoogleResponseUseCaseMock.getToken.mockResolvedValue(tokenMock);
            expect(await connectionGoogleResponseController.googleAuthCallback("code")).toEqual(tokenDTOMock);
        });

        it("should throw HttpException because it cannot get the Token data", async () => {
            connectionGoogleResponseUseCaseMock.getToken.mockImplementation(() => {
                throw new Error();
            });
            const result = connectionGoogleResponseController.googleAuthCallback("code");
            expect(result).rejects.toThrow(HttpException);
            expect(result).rejects.toHaveProperty("status", HttpStatus.INTERNAL_SERVER_ERROR);
        });

    });
});

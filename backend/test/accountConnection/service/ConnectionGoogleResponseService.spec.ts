import { Test, TestingModule } from "@nestjs/testing";
import Token from "src/accountConnection/domain/Token";
import ConnectionGoogleResponseService from "src/accountConnection/service/ConnectionGoogleResponseService";
import { CONNECTION_GOOGLE_RESPONSE_PORT } from "src/accountConnection/service/port/output/ConnectionGoogleResponsePort";

describe("ConnectionGoogleResponseService", () => {
    let connectionGoogleResponseService: ConnectionGoogleResponseService;
    let connectionGoogleResponsePortMock: { getAuthClientData: jest.Mock };
    const tokenMock = new Token("token", "refresh", new Date());

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ConnectionGoogleResponseService, { provide: CONNECTION_GOOGLE_RESPONSE_PORT, useValue: connectionGoogleResponsePortMock}]
        }).compile();
        connectionGoogleResponseService = module.get<ConnectionGoogleResponseService>(ConnectionGoogleResponseService);
    };

    beforeEach(async () => {
        connectionGoogleResponsePortMock = { getAuthClientData: jest.fn() };
        await createTestingModule();
    });

    describe("getToken", () => {
        it("TUB24 - should return the Token acquired in the callback", async () => {
            connectionGoogleResponsePortMock.getAuthClientData.mockResolvedValue(tokenMock);
            expect(await connectionGoogleResponseService.getToken("code")).toEqual(tokenMock);
        });
    });
});

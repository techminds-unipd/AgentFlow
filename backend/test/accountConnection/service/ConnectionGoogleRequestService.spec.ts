import { Test, TestingModule } from "@nestjs/testing";
import ConnectionGoogleRequestService from "src/accountConnection/service/ConnectionGoogleRequestService";
import { CONNECTION_GOOGLE_REQUEST_PORT } from "src/accountConnection/service/port/output/ConnectionGoogleRequestPort";

describe("ConnectionGoogleRequestService", () => {
    let connectionGoogleRequestService: ConnectionGoogleRequestService;
    let connectionGoogleRequestPortMock: { getOauth2ClientUrl: jest.Mock };

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ConnectionGoogleRequestService, { provide: CONNECTION_GOOGLE_REQUEST_PORT, useValue: connectionGoogleRequestPortMock}]
        }).compile();
        connectionGoogleRequestService = module.get<ConnectionGoogleRequestService>(ConnectionGoogleRequestService);
    };

    beforeEach(async () => {
        connectionGoogleRequestPortMock = { getOauth2ClientUrl: jest.fn() };
        await createTestingModule();
    });

    describe("googleAuth", () => {
        it("TUB21 - should create a redirect url for google auth", async () => {
            connectionGoogleRequestPortMock.getOauth2ClientUrl.mockReturnValue("redirectUrl");
            expect(connectionGoogleRequestService.googleAuth()).toEqual("redirectUrl");
        });
    });
});

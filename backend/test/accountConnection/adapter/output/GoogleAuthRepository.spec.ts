import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { GoogleAuthRepository } from "src/accountConnection/adapter/output/GoogleAuthRepository";

jest.mock('googleapis', () => {
    return {
        google: {
            oauth2: () => jest.fn().mockReturnValue(""),
        },
    };
});

describe("GoogleAuthRepository", () => {

    let googleAuthRepository: GoogleAuthRepository;
    //const googleTokenEntityMock = new GoogleTokenEntity("mail", "refresh", "access", new Date(1));
    let oauth2ClientMock: {generateAuthUrl: jest.Mock, getToken: jest.Mock, setCredentials: jest.Mock};

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GoogleAuthRepository,
                { provide: ConfigService,
            useValue: {
                get: jest.fn((Key: string, DefaultValue: string) => {
                    switch (Key) {
                        case 'GOOGLE_CREDENTIALS_PATH':
                            return '';
                        case 'GOOGLE_SCOPES_API':
                            return '';
                        default:
                            return DefaultValue;
                    }
                })},
            }
            ],
        }).compile();
        googleAuthRepository = module.get<GoogleAuthRepository>(GoogleAuthRepository);
    };

    beforeEach(async () => {
        oauth2ClientMock = {generateAuthUrl: jest.fn(), getToken: jest.fn(), setCredentials: jest.fn()}
        const getAuthClient = jest.spyOn(GoogleAuthRepository.prototype as any, 'getAuthClient');
        getAuthClient.mockReturnValue(oauth2ClientMock);
        await createTestingModule();
    });


    describe("getOAuth2ClientUrl", () => {
        it("TUB27 - should create a redirect url for google auth", async () => {
            oauth2ClientMock.generateAuthUrl.mockReturnValue("redirectUrl");
            expect(googleAuthRepository.getOAuth2ClientUrl()).toEqual("redirectUrl");
        });
    });

    // describe("getAuthClientData", () => {
    //     it("should return the google authentication data", async () => {
    //         const getTokenResponse = {tokens: {refresh_token: "refresh", expiry_date: 1, access_token: "access"}};
    //         oauth2ClientMock.getToken.mockReturnValue(getTokenResponse);
    //         oauth2ClientMock.setCredentials.mockImplementation(() => {});
    //         expect(await googleAuthRepository.getAuthClientData("code")).toEqual(googleTokenEntityMock);
    //     });
    //});

});

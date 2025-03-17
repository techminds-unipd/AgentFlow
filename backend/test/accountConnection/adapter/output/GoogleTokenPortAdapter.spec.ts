import { Test, TestingModule } from "@nestjs/testing";
import { GoogleAuthRepository } from "src/accountConnection/adapter/output/GoogleAuthRepository";
import GoogleTokenEntity from "src/accountConnection/adapter/output/GoogleTokenEntity";
import GoogleTokenPortAdapter from "src/accountConnection/adapter/output/GoogleTokenPortAdapter";
import Token from "src/accountConnection/domain/Token";

jest.mock('googleapis', () => {
  return {
    google: {
      oauth2: jest.fn().mockReturnValue(""),
    },
  };
});

describe("GoogleTokenPortAdapter", () => {
    let googleTokenPortAdapter: GoogleTokenPortAdapter;
    let googleAuthRepositoryMock: {
        getAuthClientData: jest.Mock,
        getOAuth2ClientUrl: jest.Mock,
    };
    const googleTokenEntityMock = new GoogleTokenEntity("", "", "", new Date(1));
    const token = new Token("", "", new Date(1));

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GoogleTokenPortAdapter,
                { provide: GoogleAuthRepository, useValue: googleAuthRepositoryMock }
            ]
        }).compile();
        googleTokenPortAdapter = module.get<GoogleTokenPortAdapter>(GoogleTokenPortAdapter);
    };

    beforeEach(async () => {
        googleAuthRepositoryMock = {
            getAuthClientData: jest.fn(),
            getOAuth2ClientUrl: jest.fn(),
        };
        await createTestingModule();
    });

    describe("getOauth2ClientUrl", () => {
        it("should create a redirect url for google auth", async () => {
            googleAuthRepositoryMock.getOAuth2ClientUrl.mockReturnValue("redirectUrl");
            expect(googleTokenPortAdapter.getOauth2ClientUrl()).toEqual("redirectUrl");
        });
    });

    describe("getAuthClientData", () => {
        it("should return the google authentication data", async () => {
            googleAuthRepositoryMock.getAuthClientData.mockResolvedValue(googleTokenEntityMock);
            expect(await googleTokenPortAdapter.getAuthClientData("code")).toEqual(token);
        });
    });

});

import { Injectable } from "@nestjs/common";
import { ConnectionGoogleRequestPort } from "src/accountConnection/service/port/output/ConnectionGoogleRequestPort";
import { ConnectionGoogleResponsePort } from "src/accountConnection/service/port/output/ConnectionGoogleResponsePort";
import { GoogleAuthRepository } from "./GoogleAuthRepository";
import GoogleTokenEntity from "./GoogleTokenEntity";
import Token from "src/accountConnection/domain/Token";

@Injectable()
class GoogleTokenPortAdapter implements ConnectionGoogleRequestPort, ConnectionGoogleResponsePort {
    constructor(private readonly googleAuthRepository: GoogleAuthRepository) {}

    private toDomain(googleToken: GoogleTokenEntity): Token {
        const token = new Token(googleToken.accessToken, googleToken.refreshToken, googleToken.expireDate);
        return token;
    }

    async getAuthClientData(code: string): Promise<Token> {
        return this.toDomain(await this.googleAuthRepository.getAuthClientData(code));
    }

    getOauth2ClientUrl(): string {
        return this.googleAuthRepository.getOAuth2ClientUrl();
    }
}

export default GoogleTokenPortAdapter;

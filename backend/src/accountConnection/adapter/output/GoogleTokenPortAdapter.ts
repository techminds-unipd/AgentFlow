import { Injectable } from "@nestjs/common";
import { ConnectionGoogleRequestPort } from "src/accountConnection/service/port/output/ConnectionGoogleRequestPort";
import { ConnectionGoogleResponsePort } from "src/accountConnection/service/port/output/ConnectionGoogleResponsePort";
import { GoogleRepository } from "./GoogleAuthRepository";
import GoogleTokenEntity from "./GoogleTokenEntity";
import Token from "src/accountConnection/domain/Token";

@Injectable()
class GoogleTokenPortAdapter implements ConnectionGoogleRequestPort, ConnectionGoogleResponsePort {
    constructor(private readonly googleRepository: GoogleRepository) {}

    private toDomain(googleToken: GoogleTokenEntity): Token {
        const token = new Token(googleToken.accessToken, googleToken.expireDate);
        return token;
    }

    async getAuthClientData(code: string): Promise<Token> {
        return this.toDomain(await this.googleRepository.getAuthClientData(code));
    }

    async getOauth2ClientUrl(): Promise<string> {
        return await this.googleRepository.getOAuth2ClientUrl();
    }

}

export default GoogleTokenPortAdapter;

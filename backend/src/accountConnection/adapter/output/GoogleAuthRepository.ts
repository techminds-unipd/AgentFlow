import { Injectable } from "@nestjs/common";
import { google } from "googleapis";
import { ConfigService } from "@nestjs/config";
import { OAuth2Client } from "google-auth-library";
import * as fs from "fs";
import * as path from "path";
import GoogleTokenEntity from "./GoogleTokenEntity";

type GoogleCredentialsFile = { installed: { client_id: string; client_secret: string; redirect_uris: string } };

@Injectable()
export class GoogleRepository {
    private readonly scopesAPI: string[];
    private readonly credentialsPath: string;

    constructor(private readonly configService: ConfigService) {
        this.credentialsPath = path.join(process.cwd(), this.configService.get("GOOGLE_CREDENTIALS_PATH") as string);
        this.scopesAPI = (this.configService.get("GOOGLE_SCOPES_API") as string).split(",");
    }

    getOAuth2ClientUrl(): string {
        const authClient = this.getAuthClient();
        return this.getAuthUrl(authClient);
    }

    /*eslint-disable max-statements*/
    async getAuthClientData(code: string): Promise<GoogleTokenEntity> {
        const authClient = this.getAuthClient();
        const tokenData = await authClient.getToken(code);
        const tokens = tokenData.tokens;
        if (
            tokens.refresh_token !== null &&
            tokens.refresh_token !== undefined &&
            tokens.access_token !== null &&
            tokens.access_token !== undefined &&
            tokens.expiry_date !== null &&
            tokens.expiry_date !== undefined
        ) {
            const refreshToken = tokens.refresh_token;
            const accessToken = tokens.access_token;
            const expireDate = new Date(tokens.expiry_date);

            authClient.setCredentials(tokens);

            const googleAuth = google.oauth2({ version: "v2", auth: authClient });

            const googleUserInfo = await googleAuth.userinfo.get();
            const email = googleUserInfo.data.email!;

            // By default it expires in 1h
            return new GoogleTokenEntity(email, refreshToken, accessToken, expireDate);
        }
        throw new Error("Cannot get Google access token or refresh token");
    }

    private readCredentials(filePath: string): GoogleCredentialsFile {
        const credentialsPath = path.join(filePath);
        const content: string = fs.readFileSync(credentialsPath, "utf-8");
        return JSON.parse(content) as GoogleCredentialsFile;
    }

    private getAuthClient(): OAuth2Client {
        const keys = this.readCredentials(this.credentialsPath);
        const authClient = new OAuth2Client(
            keys.installed.client_id,
            keys.installed.client_secret,
            keys.installed.redirect_uris[0]
        );
        return authClient;
    }

    private getAuthUrl(authClient: OAuth2Client): string {
        // Generate the url that will be used for the consent dialog.
        const authorizeUrl = authClient.generateAuthUrl({
            access_type: "offline",
            scope: this.scopesAPI,
            prompt: "consent",
            include_granted_scopes: true
        });
        return authorizeUrl;
    }
}

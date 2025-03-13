import { Injectable } from "@nestjs/common";
import { google } from "googleapis";
import { ConfigService } from "@nestjs/config";
import { OAuth2Client } from "google-auth-library";
import * as fs from "fs";
import * as path from "path";
import GoogleTokenEntity from "./GoogleTokenEntity";

@Injectable()
export class GoogleRepository {
    private readonly scopesAPI: string[];
    private readonly credentialsPath: string;
    constructor(private readonly configService: ConfigService) {
        this.credentialsPath = path.join(process.cwd(), this.configService.get("GOOGLE_CREDENTIALS_PATH")!);
        this.scopesAPI = this.configService.get("GOOGLE_SCOPES_API").split(",");
    }

    private readCredentials(filePath: string) {
        const credentialsPath = path.join(filePath);
        const content: string = fs.readFileSync(credentialsPath, "utf-8");
        return JSON.parse(content);
    }

    async getOAuth2ClientUrl(): Promise<string> {
        const authClient = this.getAuthClient();
        return this.getAuthUrl(authClient);
    }

    getAuthClient(): OAuth2Client {
        const keys = this.readCredentials(this.credentialsPath);
        console.log(keys);
        const authClient = new OAuth2Client(
            keys.installed.client_id,
            keys.installed.client_secret,
            keys.installed.redirect_uris[0]
        );
        return authClient;
    }
    getAuthUrl(authClient: OAuth2Client): string {
        // Generate the url that will be used for the consent dialog.
        const authorizeUrl = authClient.generateAuthUrl({
            access_type: "offline",
            scope: this.scopesAPI,
            prompt: "consent",
            include_granted_scopes: true
        });
        return authorizeUrl;
    }
    async getAuthClientData(code: string): Promise<GoogleTokenEntity> {
        const authClient = this.getAuthClient();
        const tokenData = await authClient.getToken(code);
        const tokens = tokenData.tokens;
        const refreshToken = tokens?.refresh_token || "";
        const accessToken = tokens?.access_token || "";

        authClient.setCredentials(tokens);

        const googleAuth = google.oauth2({ version: "v2", auth: authClient } as any);

        const googleUserInfo = await googleAuth.userinfo.get();
        console.log(googleUserInfo);
        const email = googleUserInfo.data.email!;
        return new GoogleTokenEntity(email, refreshToken, accessToken, new Date());
    }
}

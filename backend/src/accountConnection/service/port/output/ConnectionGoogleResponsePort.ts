import Token from "src/accountConnection/domain/Token";

export interface ConnectionGoogleResponsePort {
    getAuthClientData(code: string): Promise<Token>;
}

export const CONNECTION_GOOGLE_RESPONSE_PORT = "CONNECTION_GOOGLE_RESPONSE_PORT";

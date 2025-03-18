import Token from "src/accountConnection/domain/Token";

export interface ConnectionGoogleResponseUseCase {
    getToken(code: string): Promise<Token>;
}

export const CONNECTION_GOOGLE_RESPONSE_USE_CASE = "CONNECTION_GOOGLE_RESPONSE_USE_CASE";

export interface ConnectionGoogleRequestPort {
    getOauth2ClientUrl(): Promise<string>;
}

export const CONNECTION_GOOGLE_REQUEST_PORT = "CONNECTION_GOOGLE_REQUEST_PORT";

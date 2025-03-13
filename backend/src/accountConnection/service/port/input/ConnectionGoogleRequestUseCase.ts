export interface ConnectionGoogleRequestUseCase {
    googleAuth(): Promise<string>;
}

export const CONNECTION_GOOGLE_REQUEST_USE_CASE = "CONNECTION_GOOGLE_REQUEST_USE_CASE";

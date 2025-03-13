import { Inject, Injectable } from "@nestjs/common";
import { ConnectionGoogleResponseUseCase } from "./port/input/ConnectionGoogleResponseUseCase";
import { CONNECTION_GOOGLE_RESPONSE_PORT, ConnectionGoogleResponsePort } from "./port/output/ConnectionGoogleResponsePort";
import Token from "../domain/Token";

@Injectable()
class ConnectionGoogleResponseService implements ConnectionGoogleResponseUseCase {
    constructor(
        @Inject(CONNECTION_GOOGLE_RESPONSE_PORT)
        private readonly connectionGoogleResponsePort: ConnectionGoogleResponsePort,
    ) {}

    async getToken(code: string): Promise<Token> {
        return await this.connectionGoogleResponsePort.getAuthClientData(code);
    }
}

export default ConnectionGoogleResponseService;

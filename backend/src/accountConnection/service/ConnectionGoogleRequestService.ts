import { Inject, Injectable } from "@nestjs/common";
import { ConnectionGoogleRequestUseCase } from "./port/input/ConnectionGoogleRequestUseCase";
import { CONNECTION_GOOGLE_REQUEST_PORT, ConnectionGoogleRequestPort } from "./port/output/ConnectionGoogleRequestPort";

@Injectable()
class ConnectionGoogleRequestService implements ConnectionGoogleRequestUseCase {
    constructor(
        @Inject(CONNECTION_GOOGLE_REQUEST_PORT)
        private readonly connectionGoogleRequestPort: ConnectionGoogleRequestPort
    ) {}

    googleAuth(): string {
        return this.connectionGoogleRequestPort.getOauth2ClientUrl();
    }
}

export default ConnectionGoogleRequestService;

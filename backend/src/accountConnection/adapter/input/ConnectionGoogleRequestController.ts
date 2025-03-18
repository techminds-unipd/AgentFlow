import { Controller, Get, Inject, Redirect } from "@nestjs/common";
import {
    CONNECTION_GOOGLE_REQUEST_USE_CASE,
    ConnectionGoogleRequestUseCase
} from "src/accountConnection/service/port/input/ConnectionGoogleRequestUseCase";


@Controller("/google")
class ConnectionGoogleRequestController {
    constructor(
        @Inject(CONNECTION_GOOGLE_REQUEST_USE_CASE)
        private readonly connectionGoogleRequestUseCase: ConnectionGoogleRequestUseCase
    ) {}


    @Get("/auth")
    @Redirect()
    googleAuth(): { url: string } {
        const response = this.connectionGoogleRequestUseCase.googleAuth();
        return { url: response };
    }
}

export default ConnectionGoogleRequestController;

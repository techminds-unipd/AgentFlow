import { Controller, Get, Inject, Query, Redirect } from "@nestjs/common";
import {
    CONNECTION_GOOGLE_RESPONSE_USE_CASE,
    ConnectionGoogleResponseUseCase
} from "src/accountConnection/service/port/input/ConnectionGoogleResponseUseCase";
import TokenDTO from "./TokenDTO";

@Controller("/google")
class ConnectionGoogleResponseController {
    constructor(
        @Inject(CONNECTION_GOOGLE_RESPONSE_USE_CASE)
        private readonly connectionGoogleResponseUseCase: ConnectionGoogleResponseUseCase
    ) {}

    @Get("/redirect")
    @Redirect()
    async googleAuthCallback(@Query("code") code: string): Promise<TokenDTO> {
        return await this.connectionGoogleResponseUseCase.getToken(code);
    }
}

export default ConnectionGoogleResponseController;

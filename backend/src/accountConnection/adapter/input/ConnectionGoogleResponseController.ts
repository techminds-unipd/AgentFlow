import { Controller, Get, HttpException, HttpStatus, Inject, Query } from "@nestjs/common";
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
    async googleAuthCallback(@Query("code") code: string): Promise<TokenDTO> {
        try {
            return await this.connectionGoogleResponseUseCase.getToken(code);
        } catch {
            throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export default ConnectionGoogleResponseController;

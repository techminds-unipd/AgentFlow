import { Controller, Get, HttpException, HttpStatus, Inject, Query, Redirect } from "@nestjs/common";
import {
    CONNECTION_GOOGLE_RESPONSE_USE_CASE,
    ConnectionGoogleResponseUseCase
} from "src/accountConnection/service/port/input/ConnectionGoogleResponseUseCase";
import { ApiResponse } from "@nestjs/swagger";
import { RedirectUrlDTO } from "./RedirectUrlDTO";

@Controller("/google")
class ConnectionGoogleResponseController {
    constructor(
        @Inject(CONNECTION_GOOGLE_RESPONSE_USE_CASE)
        private readonly connectionGoogleResponseUseCase: ConnectionGoogleResponseUseCase
    ) {}

    @Get("/redirect")
    @Redirect()
    @ApiResponse({ status: 200, description: "Google authentication successful" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async googleAuthCallback(@Query("code") code: string): Promise<RedirectUrlDTO> {
        try {
            const { token, refreshToken, expireDate } = await this.connectionGoogleResponseUseCase.getToken(code);
            return {
                url: `${process.env.FRONTEND_URL}/services/addAccount?token=${token}&refreshToken=${refreshToken}&expireDate=${expireDate.toISOString()}`
            };
        } catch {
            throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export default ConnectionGoogleResponseController;

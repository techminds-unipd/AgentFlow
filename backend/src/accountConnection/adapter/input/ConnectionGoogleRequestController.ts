import { Controller, Get, HttpException, HttpStatus, Inject, Redirect, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/workflow/adapter/input/AuthGuard";
import { ApiBearerAuth } from "@nestjs/swagger";
import {
    CONNECTION_GOOGLE_REQUEST_USE_CASE,
    ConnectionGoogleRequestUseCase
} from "src/accountConnection/service/port/input/ConnectionGoogleRequestUseCase";

@ApiBearerAuth()
@Controller("/google")
class ConnectionGoogleRequestController {
    constructor(
        @Inject(CONNECTION_GOOGLE_REQUEST_USE_CASE)
        private readonly connectionGoogleRequestUseCase: ConnectionGoogleRequestUseCase
    ) {}

    @UseGuards(AuthGuard)
    @Get("/auth")
    @Redirect()
    googleAuth(): { url: string } {
        try {
            const response = this.connectionGoogleRequestUseCase.googleAuth();
            return { url: response };
        } catch {
            throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export default ConnectionGoogleRequestController;

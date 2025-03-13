import { Module } from "@nestjs/common";
import ConnectionGoogleRequestController from "./adapter/input/ConnectionGoogleRequestController";
import ConnectionGoogleResponseController from "./adapter/input/ConnectionGoogleResponseController";
import { CONNECTION_GOOGLE_REQUEST_USE_CASE } from "./service/port/input/ConnectionGoogleRequestUseCase";
import ConnectionGoogleRequestService from "./service/ConnectionGoogleRequestService";
import { CONNECTION_GOOGLE_RESPONSE_USE_CASE } from "./service/port/input/ConnectionGoogleResponseUseCase";
import ConnectionGoogleResponseService from "./service/ConnectionGoogleResponseService";
import { CONNECTION_GOOGLE_REQUEST_PORT } from "./service/port/output/ConnectionGoogleRequestPort";
import GoogleTokenPortAdapter from "./adapter/output/GoogleTokenPortAdapter";
import { CONNECTION_GOOGLE_RESPONSE_PORT } from "./service/port/output/ConnectionGoogleResponsePort";
import { GoogleRepository } from "./adapter/output/GoogleAuthRepository";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true })],
    controllers: [ConnectionGoogleRequestController, ConnectionGoogleResponseController],
    providers: [
        { provide: CONNECTION_GOOGLE_REQUEST_USE_CASE, useClass: ConnectionGoogleRequestService },
        { provide: CONNECTION_GOOGLE_RESPONSE_USE_CASE, useClass: ConnectionGoogleResponseService },
        { provide: CONNECTION_GOOGLE_REQUEST_PORT, useClass: GoogleTokenPortAdapter },
        { provide: CONNECTION_GOOGLE_RESPONSE_PORT, useClass: GoogleTokenPortAdapter },
        GoogleRepository
    ]
})
export class AccountConnectionModule {}

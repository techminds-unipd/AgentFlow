import { Module } from "@nestjs/common";
import { UserModule } from "./user/UserModule";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { WorkflowModule } from "./workflow/WorkflowModule";
import { AccountConnectionModule } from "./accountConnection/AccountConnectionModule";

@Module({
    imports: [
        UserModule,
        WorkflowModule,
        AccountConnectionModule,
        MongooseModule.forRoot("mongodb://root:password@localhost:27017/"),
        JwtModule.register({ global: true, secret: "chiaveSegreta", signOptions: { expiresIn: "10h" } }),
    ],
    controllers: [],
    providers: []
})
export class AppModule {}

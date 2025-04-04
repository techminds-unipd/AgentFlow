import { Module } from "@nestjs/common";
import { UserModule } from "./user/User.module";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { WorkflowModule } from "./workflow/Workflow.module";
import { AccountConnectionModule } from "./accountConnection/AccountConnection.module";

@Module({
    imports: [
        UserModule,
        WorkflowModule,
        AccountConnectionModule,
        MongooseModule.forRoot(process.env.MONGO_URL!, { dbName: "agent-flow" }),
        JwtModule.register({ global: true, secret: "chiaveSegreta", signOptions: { expiresIn: "10h" } })
    ],
    controllers: [],
    providers: []
})
export class AppModule {}

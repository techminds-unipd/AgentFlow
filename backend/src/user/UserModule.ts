import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import RegisterUserController from "./adapter/input/RegisterUserController";
import RegisterUserService from "./service/RegisterUserService";
import { UserEntity, userEntitySchema } from "./adapter/output/UserEntity";
import { UserRepository } from "./adapter/output/UserRepository";
import UserPortAdapter from "./adapter/output/UserPortAdapter";
import { GET_USER_PORT } from "./service/port/output/GetUserPort";
import { REGISTER_USER_PORT } from "./service/port/output/RegisterUserPort";
import { REGISTER_USER_USE_CASE } from "./service/port/input/RegisterUserUseCase";
import LoginController from "./adapter/input/LoginController";
import { LOGIN_USE_CASE } from "./service/port/input/LoginUseCase";
import LoginService from "./service/LoginService";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserEntity.name, schema: userEntitySchema },
        ]),
    ],
    controllers: [RegisterUserController, LoginController],

    providers: [
        { provide: REGISTER_USER_USE_CASE, useClass: RegisterUserService },
        { provide: LOGIN_USE_CASE, useClass: LoginService },
        { provide: REGISTER_USER_PORT, useClass: UserPortAdapter },
        { provide: GET_USER_PORT, useClass: UserPortAdapter },
        UserRepository,
    ],
})
export class UserModule {}

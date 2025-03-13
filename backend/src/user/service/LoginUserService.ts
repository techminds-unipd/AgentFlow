import { Inject, Injectable } from "@nestjs/common";
import User from "../domain/User";
import { GET_USER_PORT, GetUserPort } from "./port/output/GetUserPort";
import { LoginUserUseCase } from "./port/input/LoginUserUseCase";
import * as bcrypt from "bcrypt";
import { UserNotFoundError, WrongPasswordError } from "src/BusinessErrors";

@Injectable()
class LoginUserService implements LoginUserUseCase {
    constructor(@Inject(GET_USER_PORT) private readonly getUserPort: GetUserPort) {}

    async login(user: User): Promise<User> {
        const userDB = await this.getUserPort.getUserByUsername(user.username);
        if (!userDB) throw new UserNotFoundError();

        const passwordMatch = await bcrypt.compare(user.password, userDB.password);
        if (!passwordMatch) throw new WrongPasswordError();

        return userDB;
    }
}

export default LoginUserService;

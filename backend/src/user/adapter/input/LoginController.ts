import { Body, Controller, HttpException, HttpStatus, Inject, Post } from "@nestjs/common";
import { LOGIN_USE_CASE, LoginUseCase } from "src/user/service/port/input/LoginUseCase";
import User from "src/user/domain/User";
import UserDTO from "./UserDTO";
import { JwtService } from "@nestjs/jwt";
import { MongooseError } from "mongoose";
import { UserNotFoundError, WrongPasswordError } from "src/BusinessErrors";

type JWT = { readonly accessToken: string };

@Controller("user")
class LoginController {
    constructor(
        @Inject(LOGIN_USE_CASE) private readonly loginUseCase: LoginUseCase,
        private readonly jwtService: JwtService
    ) {}

    private toDomain(userDTO: UserDTO): User {
        return new User(userDTO.username, userDTO.password);
    }

    private toDTO(user: User): UserDTO {
        return new UserDTO(user.username, user.password);
    }

    @Post("/login")
    async login(@Body() req: UserDTO): Promise<JWT> {
        const user = this.toDomain(req);
        try {
            const loggedUser = await this.loginUseCase.login(user);
            const payload = { username: loggedUser.username };
            return { accessToken: await this.jwtService.signAsync(payload) };
        } catch (err) {
            if (err instanceof MongooseError)
                throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);

            if (err instanceof UserNotFoundError || err instanceof WrongPasswordError)
                throw new HttpException("Wrong credentials", HttpStatus.BAD_REQUEST);

            throw new Error("Unreachable");
        }
    }
}

export default LoginController;

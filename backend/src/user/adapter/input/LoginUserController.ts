import { Body, Controller, HttpException, HttpStatus, Inject, Post } from "@nestjs/common";
import { LOGIN_USER_USE_CASE, LoginUserUseCase } from "src/user/service/port/input/LoginUserUseCase";
import User from "src/user/domain/User";
import UserDTO from "./UserDTO";
import { JwtService } from "@nestjs/jwt";
import { UserNotFoundError, WrongPasswordError } from "src/BusinessErrors";
import JWT from "src/JWT";

@Controller("user")
class LoginUserController {
    constructor(
        @Inject(LOGIN_USER_USE_CASE) private readonly loginUserUseCase: LoginUserUseCase,
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
            const loggedUser = await this.loginUserUseCase.login(user);
            const payload = { username: loggedUser.username };
            return { accessToken: await this.jwtService.signAsync(payload) };
        } catch (err) {
            if (err instanceof UserNotFoundError || err instanceof WrongPasswordError)
                throw new HttpException("Wrong credentials", HttpStatus.BAD_REQUEST);

            throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export default LoginUserController;

import UserDTO from "./UserDTO";
import User from "src/user/domain/User";
import { REGISTER_USER_USE_CASE, RegisterUserUseCase } from "src/user/service/port/input/RegisterUserUseCase";
import { Body, Controller, HttpException, HttpStatus, Inject, Post } from "@nestjs/common";
import { UserAlreadyExistsError } from "src/BusinessErrors";

@Controller("user")
class RegisterUserController {
    constructor(
        @Inject(REGISTER_USER_USE_CASE)
        private readonly registerUserUseCase: RegisterUserUseCase
    ) {}

    private toDomain(userDTO: UserDTO): User {
        return new User(userDTO.username, userDTO.password);
    }

    private toDTO(user: User): UserDTO {
        return new UserDTO(user.username, user.password);
    }

    @Post("/register")
    async registerUser(@Body() req: UserDTO): Promise<UserDTO> {
        const user = this.toDomain(req);
        try {
            const response = await this.registerUserUseCase.registerUser(user);
            return this.toDTO(response);
        } catch (err) {
            if (err instanceof UserAlreadyExistsError)
                throw new HttpException("Username already exists", HttpStatus.BAD_REQUEST);

            throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export default RegisterUserController;

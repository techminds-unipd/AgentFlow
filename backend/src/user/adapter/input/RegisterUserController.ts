import UserDTO from "./UserDTO";
import User from "src/user/domain/User";
import { REGISTER_USER_USE_CASE, RegisterUserUseCase } from "src/user/service/port/input/RegisterUserUseCase";
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Param,
    Post,
    Put,
} from '@nestjs/common';


@Controller("user")
class RegisterUserController {
    constructor(@Inject(REGISTER_USER_USE_CASE) private readonly registerUserUseCase: RegisterUserUseCase) {}

    private toDomain(userDTO: UserDTO): User {
        return new User(userDTO.username, userDTO.password);
    }

    private toDTO(user: User): UserDTO {
        return new UserDTO(user.username, user.password);
    }
    
    @Post("/register")
    async registerUser(@Body() req: UserDTO): Promise<UserDTO> {
        const user = this.toDomain(req);
        try{
            const response = await this.registerUserUseCase.registerUser(user);
            return this.toDTO(response);
        }
        catch(err){
            throw new HttpException("TODO: qua arrivano errori di business e db", HttpStatus.BAD_REQUEST);
        }
    }
  
}

export default RegisterUserController;
import RegisterUserService from "src/user/service/RegisterUserService";
import UserDTO from "./UserDTO";
import User from "src/user/domain/User";
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';

@Controller("user")
class RegisterUserController {
    constructor(private readonly registerUserService: RegisterUserService) {}

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
            const response = await this.registerUserService.registerUser(user);
            return this.toDTO(response);
        }
        catch(err){
            throw new Error(err);
        }
    }
  
}

export default RegisterUserController;
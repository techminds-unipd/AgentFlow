import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { LOGIN_USE_CASE, LoginUseCase } from 'src/user/service/port/input/LoginUseCase';
import User from 'src/user/domain/User';
import UserDTO from './UserDTO';


@Controller("user")
class LoginController {
    constructor(@Inject(LOGIN_USE_CASE) private readonly loginUseCase: LoginUseCase) {}

    private toDomain(userDTO: UserDTO): User {
        return new User(userDTO.username, userDTO.password);
    }

    private toDTO(user: User): UserDTO {
        return new UserDTO(user.username, user.password);
    }


    @Post("/login")
    async login(@Body() req: UserDTO): Promise<boolean> {
        const user = this.toDomain(req);
        //try{
        return await this.loginUseCase.login(user);
        //}
        //catch(err){
        //    throw new Error(err);
        //}
    }
}

export default LoginController;
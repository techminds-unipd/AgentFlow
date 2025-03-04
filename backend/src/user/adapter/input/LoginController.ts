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
import { LOGIN_USE_CASE, LoginUseCase } from 'src/user/service/port/input/LoginUseCase';
import User from 'src/user/domain/User';
import UserDTO from './UserDTO';
import { JwtService } from '@nestjs/jwt';

type JWT = { readonly accessToken: string };

@Controller("user")
class LoginController {
    constructor(
        @Inject(LOGIN_USE_CASE) private readonly loginUseCase: LoginUseCase, 
        private jwtService: JwtService
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
        try{
            const loggedUser = await this.loginUseCase.login(user);
            const payload = { username: loggedUser.username };
            return { accessToken: await this.jwtService.signAsync(payload) };
        }
        catch(err){
            throw new HttpException("TODO: qua arrivano errori di business e db", HttpStatus.BAD_REQUEST);
        }
        
    }
}

export default LoginController;
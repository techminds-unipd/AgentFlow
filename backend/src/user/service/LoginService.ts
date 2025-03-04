import { Inject, Injectable } from '@nestjs/common';
import User from '../domain/User';
import { GET_USER_PORT, GetUserPort } from './port/output/GetUserPort';
import { LoginUseCase } from './port/input/LoginUseCase';


@Injectable()
class LoginService implements LoginUseCase {
    constructor(@Inject(GET_USER_PORT) private readonly getUserPort: GetUserPort) {}

    async login(user: User): Promise<boolean> {
        const userFound = await this.getUserPort.getUserByUsername(user.username);
        if (user.password === userFound.password) {
            //creo JWT
            return true;
        }
        throw new Error('Invalid credentials');
    }
}

export default LoginService;
import { Inject, Injectable } from '@nestjs/common';
import User from '../domain/User';
import { GET_USER_PORT, GetUserPort } from './port/output/GetUserPort';
import { LoginUseCase } from './port/input/LoginUseCase';
import * as bcrypt from 'bcrypt';


@Injectable()
class LoginService implements LoginUseCase {
    constructor(@Inject(GET_USER_PORT) private readonly getUserPort: GetUserPort) {}

    async login(user: User): Promise<User> {
        const userDB = await this.getUserPort.getUserByUsername(user.username);
        if (!userDB) {
            throw new Error('User not found');
        }
        const passwordMatch = await bcrypt.compare(user.password, userDB.password);
        if (!passwordMatch) {
            throw new Error('Password does not match');
        }
        return userDB;
    }
}

export default LoginService;
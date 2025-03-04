import User from '../domain/User';
import RegisterUserPort from './port/output/RegisterUserPort';
import GetUserPort from './port/output/GetUserPort';   
import RegisterUserUseCase from './port/input/RegisterUserUseCase';
import { Injectable } from '@nestjs/common';

@Injectable()
class RegisterUserService implements RegisterUserUseCase {

    constructor(private readonly registerUserPort: RegisterUserPort,
                private readonly getUserPort: GetUserPort) {}

    async registerUser(user: User): Promise<User> {
        const newUser = await this.getUserPort.getUserByUsername(user.username);
        return await this.registerUserPort.registerUser(user);
    }
}

export default RegisterUserService;
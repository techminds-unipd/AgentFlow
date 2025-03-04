import User from '../domain/User.spec';
import { REGISTER_USER_PORT, RegisterUserPort } from './port/output/RegisterUserPort';
import { GET_USER_PORT, GetUserPort } from './port/output/GetUserPort';
import { RegisterUserUseCase } from './port/input/RegisterUserUseCase';
import { Inject, Injectable } from '@nestjs/common';


@Injectable()
class RegisterUserService implements RegisterUserUseCase {

    constructor(@Inject(REGISTER_USER_PORT) private readonly registerUserPort: RegisterUserPort, @Inject(GET_USER_PORT) private readonly getUserPort: GetUserPort) {}

    async registerUser(user: User): Promise<User> {
        const foundUser = await this.getUserPort.getUserByUsername(user.username);
        if (foundUser) {
            throw new Error('User already exists');
        }
        return await this.registerUserPort.registerUser(await user.hashPassword());
    }
}

export default RegisterUserService;
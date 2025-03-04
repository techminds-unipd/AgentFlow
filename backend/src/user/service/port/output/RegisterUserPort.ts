import User from '../../../domain/User';

interface RegisterUserPort {
    registerUser(user: User): Promise<User>;
}

export default RegisterUserPort;
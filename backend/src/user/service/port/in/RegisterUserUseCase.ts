import User from '../../../domain/User';

interface RegisterUserUseCase {
    registerUser(user: User): Promise<User>;
}

export default RegisterUserUseCase;
import User from '../../../domain/User';

interface LoginUseCase {
    login(user: User): boolean;
}

export default LoginUseCase;
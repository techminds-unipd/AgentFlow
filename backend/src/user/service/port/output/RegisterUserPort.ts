import User from '../../../domain/User';

export interface RegisterUserPort {
    checkUserExists(username: string): Promise<boolean>;
    registerUser(user: User): Promise<User>;
}

export const REGISTER_USER_PORT = 'REGISTER_USER_PORT';
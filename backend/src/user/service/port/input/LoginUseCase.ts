import User from '../../../domain/User';

export interface LoginUseCase {
    login(user: User): Promise<User>;
}

export const LOGIN_USE_CASE = 'LOGIN_USE_CASE';

import User from '../../../domain/User';

export interface GetUserPort {
    getUserByUsername(username: string): Promise<User | null>;
}

export const GET_USER_PORT = 'GET_USER_PORT';

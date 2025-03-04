import User from '../../../domain/User';

interface GetUserPort {
    getUserByUsername(username:string): Promise<User>;
}

export default GetUserPort;
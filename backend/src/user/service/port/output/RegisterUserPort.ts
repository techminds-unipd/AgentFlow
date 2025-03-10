import User from "../../../domain/User";

export interface RegisterUserPort {
    registerUser(user: User): Promise<User>;
}

export const REGISTER_USER_PORT = "REGISTER_USER_PORT";

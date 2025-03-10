import User from "../../../domain/User";

export interface RegisterUserUseCase {
    registerUser(user: User): Promise<User>;
}

export const REGISTER_USER_USE_CASE = "REGISTER_USER_USE_CASE";

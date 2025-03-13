import User from "../../../domain/User";

export interface LoginUserUseCase {
    login(user: User): Promise<User>;
}

export const LOGIN_USER_USE_CASE = "LOGIN_USER_USE_CASE";

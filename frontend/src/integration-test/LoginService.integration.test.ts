import { expect, test, describe, beforeAll } from "vitest";
import { RegisterService } from "../services/RegisterService";
import { UserDTO } from "../services/dto/userDTO";
import { LoginService } from "../services/LoginService";

describe("LoginService - integration", () => {
    let user: UserDTO;

    beforeAll(async () => {
        const registerService = new RegisterService();
        const username = new Date().toISOString().replace(/[-:.]/g, "");
        user = new UserDTO(username, "Ciao1234$");
        await registerService.register(user);
    });

    test("TIF9 - Should return the received access token when one is received from backend", async () => {
        const loginService = new LoginService();
        await expect(loginService.login(user)).resolves.toHaveProperty("accessToken");
    });

    test("TIF10 - Should throw an error with message 'wrong username or password' if receives error 401", async () => {
        const loginService = new LoginService();
        await expect(async () => loginService.login(new UserDTO(user.username, "wrong"))).rejects.toThrowError(
            "wrong username or password"
        );
    });
});

import { expect, test, describe } from "vitest";
import { RegisterService } from "../services/RegisterService";
import { UserDTO } from "../services/dto/userDTO";

describe("RegisterService - integration", () => {

  test("Should return the created user when successful", async () => {
    const registerService = new RegisterService();
    const username = new Date().toISOString().replace(/[-:.]/g, "");
    const user = new UserDTO(username, "Ciao1234$");

    const result = registerService.register(user);
    await expect(result).resolves.toHaveProperty("username");
    await expect(result).resolves.toHaveProperty("password");
  });

  test("Should throw an error with message 'Username already exists' if status 400 is received", async () => {
    const registerService = new RegisterService();
    const username = new Date().toISOString().replace(/[-:.]/g, "");
    const user = new UserDTO(username, "Ciao1234$");
    await registerService.register(user);

    await expect(async () => registerService.register(user)).rejects.toThrowError("Username already exists");
  });

});

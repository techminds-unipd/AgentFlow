import * as bcrypt from "bcrypt";
import User from "src/user/domain/User";

jest.mock("bcrypt", () => ({ hash: jest.fn() }));

describe("User", () => {
    describe("hashPassword", () => {
        const userMock = new User("Gianni", "Testing1234");
        const hashedUser = new User("Gianni", "hashedPassword");

        it("should hash the password with salt 10", async () => {
            (bcrypt.hash as jest.Mock).mockResolvedValue(hashedUser.password);
            expect(await userMock.hashPassword()).toEqual(hashedUser);
        });
    });
});

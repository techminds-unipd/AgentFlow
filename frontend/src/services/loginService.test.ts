import { expect, test, describe, vi, beforeEach } from "vitest";
import { waitFor } from "@testing-library/react";
import { LoginService } from "./loginService";
import { API_BASE_URL } from "./constants";
import { UserDTO } from "./dto/userDTO";

describe("Login API", () => {
    const username = "testUsername";
    const password = "testPassword";
    const user = new UserDTO(username, password);

    const fetchSpy = vi.spyOn(window, "fetch");

    beforeEach(() => {
        fetchSpy.mockReset();
    });

    const service = new LoginService();

    test("Should return the received access token when one is received from backend", async () => {
        const accessToken = "testToken";
        const mockResolveValue = {
            status: 201,
            json: async (): Promise<{ accessToken: string }> => new Promise((resolve) => resolve({ accessToken }))
        };

        fetchSpy.mockResolvedValue(mockResolveValue as Response);
        const loginResponse = await service.login(user);
        expect(loginResponse).toEqual({ accessToken });
        expect(fetchSpy).toBeCalledTimes(1);
        expect(fetchSpy).toBeCalledWith(`${API_BASE_URL}/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
    });

    test("Should throw an error with message 'wrong username or password' if receives error 401", async () => {
        const mockResolveValue = {
            status: 401,
            json: async (): Promise<string> => new Promise((resolve) => resolve("Wrong credentials"))
        };

        fetchSpy.mockResolvedValue(mockResolveValue as Response);
        await expect(async () => service.login(user)).rejects.toThrowError("wrong username or password");
        await waitFor(() => {
            expect(fetchSpy).toBeCalledTimes(1);
            expect(fetchSpy).toBeCalledWith(`${API_BASE_URL}/user/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });
        });
    });

    test("Should throw an error with message 'Server error' if receives error 500", async () => {
        const mockResolveValue = {
            status: 500,
            json: async (): Promise<string> => new Promise((resolve) => resolve("Server error"))
        };

        fetchSpy.mockResolvedValue(mockResolveValue as Response);
        await expect(async () => service.login(user)).rejects.toThrowError("Server error");
        await waitFor(() => {
            expect(fetchSpy).toBeCalledTimes(1);
            expect(fetchSpy).toBeCalledWith(`${API_BASE_URL}/user/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });
        });
    });

    test("Should throw an error with message 'Generic error' if fetch fails", async () => {
        fetchSpy.mockRejectedValue(() => {});
        await expect(async () => service.login(user)).rejects.toThrowError("Generic error");
        await waitFor(() => {
            expect(fetchSpy).toBeCalledTimes(1);
            expect(fetchSpy).toBeCalledWith(`${API_BASE_URL}/user/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });
        });
    });
});

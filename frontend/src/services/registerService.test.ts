import { expect, test, describe, vi, beforeEach } from "vitest";
import { RegisterService } from "./registerService";
import { API_BASE_URL } from "./constants";

describe("register API", () => {
    const fetchSpy = vi.spyOn(window, "fetch");

    beforeEach(() => {
        fetchSpy.mockReset();
    });

    const username = "Test";
    const password = "Password.1";
    const service = new RegisterService();

    test("Should return the created workflow when successful", async () => {
        const mockResponse = { username, password };

        fetchSpy.mockResolvedValue({ status: 201, json: async () => Promise.resolve(mockResponse) } as Response);

        await expect(service.register(username, password)).resolves.toEqual(mockResponse);
        expect(fetchSpy).toBeCalledTimes(1);
        expect(fetchSpy).toBeCalledWith(`${API_BASE_URL}/user/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
    });

    test("Should throw an error with message 'Username already exists' if status 400 is received", async () => {
        fetchSpy.mockResolvedValue({ status: 400, json: async () => Promise.resolve("Username already exists") } as Response);

        await expect(service.register(username, password)).rejects.toThrowError("Username already exists");
    });

    test("Should throw an error with message 'Server error' if status 500 is received", async () => {
        fetchSpy.mockResolvedValue({ status: 500, json: async () => Promise.resolve("Server error") } as Response);

        await expect(service.register(username, password)).rejects.toThrowError("Server error");
    });

    test("Should throw an error with message 'Generic Error' if fetch fails", async () => {
        fetchSpy.mockRejectedValue(new Error("Generic Error"));

        await expect(service.register(username, password)).rejects.toThrowError("Generic Error");
    });
});

import { expect, test, describe, vi, beforeEach } from "vitest";
import { waitFor } from "@testing-library/react";
import { login } from "./loginAPI";
import { API_BASE_URL } from "./constants";

describe("Login API", () =>{
    const fetchSpy = vi.spyOn(window, 'fetch');

    beforeEach(() => {
        fetchSpy.mockReset();
    })


    test("Should return the received access token when one is received from backend", async () => {
        const accessToken = "testToken";
        const mockResolveValue = {
            status: 201,
            json: () => new Promise((resolve)=>resolve({accessToken}))
        };
    
        fetchSpy.mockResolvedValue(mockResolveValue as Response);
        const username = "testUsername";
        const password = "testPassword";
        login(username, password).then((loginResponse) => {
            expect(loginResponse).toEqual({accessToken});
            expect(fetchSpy).toBeCalledTimes(1);
            expect(fetchSpy).toBeCalledWith(`${API_BASE_URL}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
        });
    })

    test("Should throw an error with message 'wrong username or password' if receives error 401", async () => {
        const mockResolveValue = {
            status: 401,
            json: () => new Promise((resolve)=>resolve("Wrong credentials"))
        };

        fetchSpy.mockResolvedValue(mockResolveValue as Response);
        const username = "testUsername";
        const password = "testPassword";
        await expect(()=> login(username, password)).rejects.toThrowError("wrong username or password");
        waitFor(() => {
            expect(fetchSpy).toBeCalledTimes(1);
            expect(fetchSpy).toBeCalledWith(`${API_BASE_URL}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
        });
    })

    test("Should throw an error with message 'Server error' if receives error 500", async () => {
        const mockResolveValue = {
            status: 500,
            json: () => new Promise((resolve)=>resolve("Server error"))
        };

        fetchSpy.mockResolvedValue(mockResolveValue as Response);
        const username = "testUsername";
        const password = "testPassword";
        await expect(()=> login(username, password)).rejects.toThrowError("Server error");
        waitFor(() => {
            expect(fetchSpy).toBeCalledTimes(1);
            expect(fetchSpy).toBeCalledWith(`${API_BASE_URL}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
        });
    })

    test("Should throw an error with message 'Generic error' if fetch fails", async () => {

        fetchSpy.mockRejectedValue(()=>{});
        const username = "testUsername";
        const password = "testPassword";
        await expect(()=> login(username, password)).rejects.toThrowError("Generic error");
        waitFor(() => {
            expect(fetchSpy).toBeCalledTimes(1);
            expect(fetchSpy).toBeCalledWith(`${API_BASE_URL}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
        });
    })
})
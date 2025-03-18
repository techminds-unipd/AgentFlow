import { expect, test, describe, vi, beforeEach } from "vitest";
import { allWorkflow, API_BASE_URL } from "./allWorkflowAPI";
import '@testing-library/jest-dom';

describe("allWorkflow API", () => {
    const fetchSpy = vi.spyOn(window, 'fetch');

    beforeEach(() => {
        fetchSpy.mockReset();
    });

    test("Should return the list of workflows when successful", async () => {
        const accessToken = "testToken";
        const mockResponse = ["workflow1", "workflow2"];
        
        fetchSpy.mockResolvedValue({
            status: 200,
            json: () => Promise.resolve(mockResponse)
        } as Response);
        
        await expect(allWorkflow(accessToken)).resolves.toEqual(mockResponse);
        expect(fetchSpy).toBeCalledTimes(1);
        expect(fetchSpy).toBeCalledWith(`${API_BASE_URL}/workflow/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
        });
    });

    test("Should throw an error with message 'Something wrong' if status 400 is received", async () => {
        const accessToken = "testToken";
        
        fetchSpy.mockResolvedValue({
            status: 400,
            json: () => Promise.resolve("User not found")
        } as Response);
        
        await expect(allWorkflow(accessToken)).rejects.toThrowError("User not found");
    });

    test("Should throw an error with message 'Server error' if status 500 is received", async () => {
        const accessToken = "testToken";
        
        fetchSpy.mockResolvedValue({
            status: 500,
            json: () => Promise.resolve("Server error")
        } as Response);
        
        await expect(allWorkflow(accessToken)).rejects.toThrowError("Server error");
    });

    test("Should throw an error with message 'Generic error' if fetch fails", async () => {
        const accessToken = "testToken";
        
        fetchSpy.mockRejectedValue(new Error("Generic error"));
        
        await expect(allWorkflow(accessToken)).rejects.toThrowError("Generic error");
    });
});
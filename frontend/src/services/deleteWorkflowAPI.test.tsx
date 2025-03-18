import { expect, test, describe, vi, beforeEach } from "vitest";
import { deleteWorkflowByName, API_BASE_URL } from "./deleteWorkflowAPI";

describe("deleteWorkflowByName API", () => {
    const fetchSpy = vi.spyOn(window, 'fetch');

    beforeEach(() => {
        fetchSpy.mockReset();
    });

    test("Should return the deleted workflow when successful", async () => {
        const name = "testWorkflow";
        const accessToken = "testToken";
        const mockResponse = { name, accessToken };
        
        fetchSpy.mockResolvedValue({
            status: 200,
            json: () => Promise.resolve(mockResponse)
        } as Response);
        
        await expect(deleteWorkflowByName(name, accessToken)).resolves.toEqual(mockResponse);
        expect(fetchSpy).toBeCalledTimes(1);
        expect(fetchSpy).toBeCalledWith(`${API_BASE_URL}/workflow/delete/${name}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
        });
    });

    test("Should throw an error with message 'Some error' if status 400 is received", async () => {
        const name = "testWorkflow";
        const accessToken = "testToken";
        
        fetchSpy.mockResolvedValue({
            status: 400,
            json: () => Promise.resolve("Some error")
        } as Response);
        
        await expect(deleteWorkflowByName(name, accessToken)).rejects.toThrowError("Some error");
    });

    test("Should throw an error with message 'Server error' if status 500 is received", async () => {
        const name = "testWorkflow";
        const accessToken = "testToken";
        
        fetchSpy.mockResolvedValue({
            status: 500,
            json: () => Promise.resolve("Server error")
        } as Response);
        
        await expect(deleteWorkflowByName(name, accessToken)).rejects.toThrowError("Server error");
    });

    test("Should throw an error with message 'Generic error' if fetch fails", async () => {
        const name = "testWorkflow";
        const accessToken = "testToken";
        
        fetchSpy.mockRejectedValue(new Error("Generic error"));
        
        await expect(deleteWorkflowByName(name, accessToken)).rejects.toThrowError("Generic error");
    });
});
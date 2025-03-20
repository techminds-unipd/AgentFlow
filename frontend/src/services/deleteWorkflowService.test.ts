import { expect, test, describe, vi, beforeEach } from "vitest";
import { DeleteWorkflowService } from "./deleteWorkflowService";
import { API_BASE_URL } from "./constants";

describe("deleteWorkflowByName API", () => {
    const fetchSpy = vi.spyOn(window, "fetch");

    beforeEach(() => {
        fetchSpy.mockReset();
    });

    const name = "testWorkflow";
    const accessToken = "testToken";
    const service = new DeleteWorkflowService(accessToken);

    test("Should return the deleted workflow when successful", async () => {
        const mockResponse = { name };
        
        fetchSpy.mockResolvedValue({
            status: 200,
            json: () => Promise.resolve(mockResponse)
        } as Response);
        
        await expect(service.deleteWorkflowByName(name)).resolves.toEqual(mockResponse);
        expect(fetchSpy).toBeCalledTimes(1);
        expect(fetchSpy).toBeCalledWith(`${API_BASE_URL}/workflow/delete/${name}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
        });
    });

    test("Should throw an error with message 'Generic error' if status 404 is received", async () => {
        fetchSpy.mockResolvedValue({
            status: 400,
            json: () => Promise.resolve("Generic error")
        } as Response);
        
        await expect(service.deleteWorkflowByName(name)).rejects.toThrowError("Generic error");
    });

    test("Should throw an error with message 'Server error' if status 500 is received", async () => {
        fetchSpy.mockResolvedValue({
            status: 500,
            json: () => Promise.resolve("Server error")
        } as Response);
        
        await expect(service.deleteWorkflowByName(name)).rejects.toThrowError("Server error");
    });

    test("Should throw an error with message 'Generic error' if fetch fails", async () => {
        fetchSpy.mockRejectedValue(new Error("Generic error"));
        
        await expect(service.deleteWorkflowByName(name)).rejects.toThrowError("Generic error");
    });
});
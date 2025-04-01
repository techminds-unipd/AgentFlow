import { expect, test, describe, vi, beforeEach } from "vitest";
import { DeleteWorkflowService } from "./DeleteWorkflowService";
import { API_BASE_URL } from "./Constants";

describe("deleteWorkflowByName API", () => {
    const fetchSpy = vi.spyOn(window, "fetch");

    beforeEach(() => {
        fetchSpy.mockReset();
    });

    const name = "testWorkflow";
    const accessToken = "testToken";
    const service = new DeleteWorkflowService();

    test("TUF9 - Should return the deleted workflow when successful", async () => {
        const mockResponse = { name };

        fetchSpy.mockResolvedValue({ status: 200, json: async () => Promise.resolve(mockResponse) } as Response);

        await expect(service.deleteWorkflowByName(name, accessToken)).resolves.toEqual(mockResponse);
        expect(fetchSpy).toBeCalledTimes(1);
        expect(fetchSpy).toBeCalledWith(`${API_BASE_URL}/workflow/delete/${name}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` }
        });
    });

    test("TUF10 - Should throw an error with message 'Generic error' if status 404 is received", async () => {
        fetchSpy.mockResolvedValue({ status: 400, json: async () => Promise.resolve("Generic error") } as Response);

        await expect(service.deleteWorkflowByName(name, accessToken)).rejects.toThrowError("Generic error");
    });

    test("TUF11 - Should throw an error with message 'Server error' if status 500 is received", async () => {
        fetchSpy.mockResolvedValue({ status: 500, json: async () => Promise.resolve("Server error") } as Response);

        await expect(service.deleteWorkflowByName(name, accessToken)).rejects.toThrowError("Server error");
    });

    test("TUF12 - Should throw an error with message 'Generic error' if fetch fails", async () => {
        fetchSpy.mockRejectedValue(new Error("Generic error"));

        await expect(service.deleteWorkflowByName(name, accessToken)).rejects.toThrowError("Generic error");
    });
});

import { expect, test, describe, vi, beforeEach } from "vitest";
import { AllWorkflowsService } from "./AllWorkflowsService";
import { API_BASE_URL } from "./Constants";
import "@testing-library/jest-dom";

describe("allWorkflows API", () => {
    const fetchSpy = vi.spyOn(window, "fetch");

    beforeEach(() => {
        fetchSpy.mockReset();
    });

    const accessToken = "testToken";
    const service = new AllWorkflowsService();

    test("Should return the list of workflows when successful", async () => {
        const mockResponse = ["workflow1", "workflow2"];

        fetchSpy.mockResolvedValue({ status: 200, json: async () => Promise.resolve(mockResponse) } as Response);

        await expect(service.allWorkflows(accessToken)).resolves.toEqual(mockResponse);
        expect(fetchSpy).toBeCalledTimes(1);
        expect(fetchSpy).toBeCalledWith(`${API_BASE_URL}/workflow/all`, {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` }
        });
    });

    test("Should throw an error with message 'User not found' if status 400 is received", async () => {
        fetchSpy.mockResolvedValue({ status: 400, json: async () => Promise.resolve("User not found") } as Response);

        await expect(service.allWorkflows(accessToken)).rejects.toThrowError("User not found");
    });

    test("Should throw an error with message 'Server error' if status 500 is received", async () => {
        fetchSpy.mockResolvedValue({ status: 500, json: async () => Promise.resolve("Server error") } as Response);

        await expect(service.allWorkflows(accessToken)).rejects.toThrowError("Server error");
    });

    test("Should throw an error with message 'Generic error' if fetch fails", async () => {
        fetchSpy.mockRejectedValue(new Error("Generic error"));

        await expect(service.allWorkflows(accessToken)).rejects.toThrowError("Generic error");
    });
});

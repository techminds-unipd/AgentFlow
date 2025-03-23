import { expect, test, describe, vi, beforeEach } from "vitest";
import { NewWorkflowService } from "./newWorkflowService";
import { API_BASE_URL } from "./constants";

describe("newWorkflow API", () => {
    const fetchSpy = vi.spyOn(window, "fetch");

    beforeEach(() => {
        fetchSpy.mockReset();
    });

    const name = "testWorkflow";
    const accessToken = "testToken";
    const service = new NewWorkflowService(accessToken);

    test("Should return the created workflow when successful", async () => {
        const mockResponse = { name };

        fetchSpy.mockResolvedValue({ status: 201, json: async () => Promise.resolve(mockResponse) } as Response);

        await expect(service.newWorkflow(name)).resolves.toEqual(mockResponse);
        expect(fetchSpy).toBeCalledTimes(1);
        expect(fetchSpy).toBeCalledWith(`${API_BASE_URL}/workflow/create/${name}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
            body: JSON.stringify({ name })
        });
    });

    test("Should throw an error with message 'Workflow with the same name already exists' if status 400 is received", async () => {
        fetchSpy.mockResolvedValue({
            status: 400,
            json: async () => Promise.resolve("Workflow with the same name already exists")
        } as Response);

        await expect(service.newWorkflow(name)).rejects.toThrowError("Workflow with the same name already exists");
    });

    test("Should throw an error with message 'Server error' if status 500 is received", async () => {
        fetchSpy.mockResolvedValue({ status: 500, json: async () => Promise.resolve("Server error") } as Response);

        await expect(service.newWorkflow(name)).rejects.toThrowError("Server error");
    });

    test("Should throw an error with message 'Generic Error' if fetch fails", async () => {
        fetchSpy.mockRejectedValue(new Error("Generic Error"));

        await expect(service.newWorkflow(name)).rejects.toThrowError("Generic Error");
    });
});

import { expect, test, describe, vi, beforeEach } from "vitest";
import { CreateWorkflowService } from "./CreateWorkflowService";
import { API_BASE_URL } from "./Constants";

describe("newWorkflow API", () => {
    const fetchSpy = vi.spyOn(window, "fetch");

    beforeEach(() => {
        fetchSpy.mockReset();
    });

    const name = "testWorkflow";
    const accessToken = "testToken";
    const service = new CreateWorkflowService();

    test("TUF5 - Should return the created workflow when successful", async () => {
        const mockResponse = { name };

        fetchSpy.mockResolvedValue({ status: 201, json: async () => Promise.resolve(mockResponse) } as Response);

        await expect(service.newWorkflow(name, accessToken)).resolves.toEqual(mockResponse);
        expect(fetchSpy).toBeCalledTimes(1);
        expect(fetchSpy).toBeCalledWith(`${API_BASE_URL}/workflow/create/${name}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
            body: JSON.stringify({ name })
        });
    });

    test("TUF6 - Should throw an error with message 'Workflow with the same name already exists' if status 400 is received", async () => {
        fetchSpy.mockResolvedValue({
            status: 400,
            json: async () => Promise.resolve("Workflow with the same name already exists")
        } as Response);

        await expect(service.newWorkflow(name, accessToken)).rejects.toThrowError("Workflow with the same name already exists");
    });

    test("TUF7 - Should throw an error with message 'Server error' if status 500 is received", async () => {
        fetchSpy.mockResolvedValue({ status: 500, json: async () => Promise.resolve("Server error") } as Response);

        await expect(service.newWorkflow(name, accessToken)).rejects.toThrowError("Server error");
    });

    test("TUF8 - Should throw an error with message 'Generic Error' if fetch fails", async () => {
        fetchSpy.mockRejectedValue(new Error("Generic Error"));

        await expect(service.newWorkflow(name, accessToken)).rejects.toThrowError("Generic Error");
    });
});

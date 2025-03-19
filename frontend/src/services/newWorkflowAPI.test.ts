import { expect, test, describe, vi, beforeEach } from "vitest";
import { newWorkflow } from "./newWorkflowAPI";
import { API_BASE_URL } from "./constants";

describe("newWorkflow API", () => {
    const fetchSpy = vi.spyOn(window, "fetch");

    beforeEach(() => {
        fetchSpy.mockReset();
    });

    test("Should return the created workflow when successful", async () => {
        const name = "testWorkflow";
        const accessToken = "testToken";
        const mockResponse = { name, accessToken };
        
        fetchSpy.mockResolvedValue({
            status: 201,
            json: () => Promise.resolve(mockResponse)
        } as Response);
        
        await expect(newWorkflow(name, accessToken)).resolves.toEqual(mockResponse);
        expect(fetchSpy).toBeCalledTimes(1);
        expect(fetchSpy).toBeCalledWith(`${API_BASE_URL}/workflow/create/${name}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ name }),
        });
    });

    test("Should throw an error with message 'Workflow with the same name already exists' if status 400 is received", async () => {
        const name = "testWorkflow";
        const accessToken = "testToken";
        
        fetchSpy.mockResolvedValue({
            status: 400,
            json: () => Promise.resolve("Workflow with the same name already exists")
        } as Response);
        
        await expect(newWorkflow(name, accessToken)).rejects.toThrowError("Workflow with the same name already exists");
    });

    test("Should throw an error with message 'Server error' if status 500 is received", async () => {
        const name = "testWorkflow";
        const accessToken = "testToken";
        
        fetchSpy.mockResolvedValue({
            status: 500,
            json: () => Promise.resolve("Server error")
        } as Response);
        
        await expect(newWorkflow(name, accessToken)).rejects.toThrowError("Server error");
    });

    test("Should throw an error with message 'Generic Error' if fetch fails", async () => {
        const name = "testWorkflow";
        const accessToken = "testToken";
        
        fetchSpy.mockRejectedValue(new Error("Generic Error"));
        
        await expect(newWorkflow(name, accessToken)).rejects.toThrowError("Generic Error");
    });
});
import { expect, test, describe, vi, beforeEach } from "vitest";
import { API_BASE_URL } from "./Constants";
import { WorkflowDTO } from "./dto/WorkflowDTO";
import { SaveWorkflowService } from "./SaveWorkflowService";

describe("SaveWorkflowService", () => {
    const fetchSpy = vi.spyOn(window, "fetch");

    beforeEach(() => {
        fetchSpy.mockReset();
    });

    const service = new SaveWorkflowService();
    const accessToken = "testToken";
    const workflow = new WorkflowDTO("workflow", [], []);

    test("TUF58 - Should return the just saved workflow", async () => {
        fetchSpy.mockResolvedValue({ status: 200, json: async () => Promise.resolve(workflow) } as Response);

        await expect(service.saveWorkflow(workflow, accessToken)).resolves.toEqual(workflow);
        expect(fetchSpy).toBeCalledTimes(1);
        expect(fetchSpy).toBeCalledWith(`${API_BASE_URL}/workflow/save`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
            body: JSON.stringify(workflow)
        });
    });

    test("TUF59 - Should throw an error with a message if status != 200 is received", async () => {
        fetchSpy.mockResolvedValue({ status: 400, json: async () => Promise.resolve({ message: "Generic error" }) } as Response);

        await expect(service.saveWorkflow(workflow, accessToken)).rejects.toThrowError("Generic error");
    });
});

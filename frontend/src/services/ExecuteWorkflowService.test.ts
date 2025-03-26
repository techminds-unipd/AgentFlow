import { expect, test, describe, vi, beforeEach } from "vitest";
import { API_BASE_URL } from "./constants";
import { WorkflowDTO } from "./dto/WorkflowDTO";
import { ExecuteWorkflowService } from "./ExecuteWorkflowService";
import { GoogleAccountToken } from "../context/GoogleTokenContext";

describe("ExecuteWorkflowService", () => {
    const fetchSpy = vi.spyOn(window, "fetch");

    beforeEach(() => {
        fetchSpy.mockReset();
    });

    const service = new ExecuteWorkflowService();
    const accessToken = "testToken";
    const googleToken: GoogleAccountToken = { token: "token", refreshToken: "refresh", expireDate: "" };
    const workflow = new WorkflowDTO("workflow", [], []);

    test("Should return the execution result from the AI agent", async () => {
        fetchSpy.mockResolvedValue({ status: 201, text: async () => Promise.resolve("Execution result") } as Response);

        await expect(service.executeWorkflow(workflow, accessToken, googleToken)).resolves.toEqual("Execution result");
        expect(fetchSpy).toBeCalledTimes(1);
        expect(fetchSpy).toBeCalledWith(`${API_BASE_URL}/workflow/execute`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
            body: JSON.stringify({
                workflow: workflow,
                googleToken: {
                    token: googleToken.token,
                    refreshToken: googleToken.refreshToken,
                    expireDate: googleToken.expireDate
                }
            })
        });
    });

    test("Should throw an error with a message if status != 200 is received", async () => {
        fetchSpy.mockResolvedValue({ status: 400, json: async () => Promise.resolve({ message: "Generic error" }) } as Response);

        await expect(service.executeWorkflow(workflow, accessToken, googleToken)).rejects.toThrowError("Generic error");
    });
});

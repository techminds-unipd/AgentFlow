import { expect, test, describe, vi, beforeEach } from "vitest";
import { API_BASE_URL } from "./constants";
import { GetWorkflowService } from "./GetWorkflowService";
import { WorkflowDTO } from "./dto/WorkflowDTO";

describe("GetWorkflowService", () => {
  const fetchSpy = vi.spyOn(window, "fetch");

  beforeEach(() => {
    fetchSpy.mockReset();
  });

  const service = new GetWorkflowService();
  const workflowName = "workflow";
  const accessToken = "testToken";

  test("Should return the received workflow when one is received from backend", async () => {
    const mockResponse = { name: "workflow", nodes: [], edges: [] };
    const workflow = new WorkflowDTO("workflow", [], []);

    fetchSpy.mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(mockResponse)
    } as Response);

    await expect(service.getWorkflow(workflowName, accessToken)).resolves.toEqual(workflow);
    expect(fetchSpy).toBeCalledTimes(1);
    expect(fetchSpy).toBeCalledWith(`${API_BASE_URL}/workflow/get/${workflowName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    });
  });

  test("Should throw an error with a message if status != 200 is received", async () => {
    fetchSpy.mockResolvedValue({
        status: 400,
        json: () => Promise.resolve({message: "Generic error"})
    } as Response);

      await expect(service.getWorkflow(workflowName, accessToken)).rejects.toThrowError("Generic error");
  });
});

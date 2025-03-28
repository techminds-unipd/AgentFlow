import { expect, test, describe, beforeAll } from "vitest";
import { RegisterService } from "../services/RegisterService";
import { UserDTO } from "../services/dto/userDTO";
import { LoginService } from "../services/LoginService";
import { CreateWorkflowService } from "../services/CreateWorkflowService";
import { DeleteWorkflowService } from "../services/DeleteWorkflowService";
import { WorkflowDTO } from "../services/dto/WorkflowDTO";

describe("DeleteWorkflowService - integration", () => {
  beforeAll(async () => {
    const registerService = new RegisterService();
    const loginService = new LoginService();
    const username = new Date().toISOString().replace(/[-:.]/g, "");
    await registerService.register(new UserDTO(username, "Ciao1234$"));
    const loginResponse = await loginService.login(new UserDTO(username, "Ciao1234$"));

    accessToken = loginResponse.accessToken;
    createWorkflowService = new CreateWorkflowService();
    deleteWorkflowService = new DeleteWorkflowService();
    workflowName = "workflowName-" + new Date().toISOString().replace(/[-:.]/g, "")
  });

  let accessToken: string;
  let workflowName: string;
  let createWorkflowService: CreateWorkflowService;
  let deleteWorkflowService: DeleteWorkflowService;

  test("Should return the deleted workflow when successful", async () => {
    const workflow = new WorkflowDTO(workflowName, [], []);
    await createWorkflowService.newWorkflow(workflowName, accessToken);
    await expect(deleteWorkflowService.deleteWorkflowByName(workflowName, accessToken)).resolves.toEqual(workflow);
  });

  test("Should throw an error with a message if status 404 is received", async () => {
    await expect(deleteWorkflowService.deleteWorkflowByName(workflowName, accessToken)).rejects.toThrowError("workflow not found");
  });
});

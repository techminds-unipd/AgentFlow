import { expect, test, describe, beforeAll } from "vitest";
import { RegisterService } from "../services/RegisterService";
import { UserDTO } from "../services/dto/userDTO";
import { LoginService } from "../services/LoginService";
import { CreateWorkflowService } from "../services/CreateWorkflowService";
import { DeleteWorkflowService } from "../services/DeleteWorkflowService";
import { WorkflowDTO } from "../services/dto/WorkflowDTO";

describe("CreateWorkflowService - integration", () => {
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

  test("TIF3 - Should return the created workflow when successful", async () => {
    const workflow = new WorkflowDTO(workflowName, [], []);
    await expect(createWorkflowService.newWorkflow(workflowName, accessToken)).resolves.toEqual(workflow);
    await deleteWorkflowService.deleteWorkflowByName(workflowName, accessToken);
  });

  test("TIF4 - Should throw an error with message 'Workflow with the same name already exists' if status 400 is received", async () => {
    await createWorkflowService.newWorkflow(workflowName, accessToken)
    await expect(createWorkflowService.newWorkflow(workflowName, accessToken)).rejects.toThrowError("Workflow with the same name already exists");
    await deleteWorkflowService.deleteWorkflowByName(workflowName, accessToken);
  });
});

import { expect, test, describe, beforeAll } from "vitest";
import { RegisterService } from "../services/RegisterService";
import { UserDTO } from "../services/dto/userDTO";
import { LoginService } from "../services/LoginService";
import { CreateWorkflowService } from "../services/CreateWorkflowService";
import { DeleteWorkflowService } from "../services/DeleteWorkflowService";
import { AllWorkflowsService } from "../services/AllWorkflowsService";

describe("AllWorkflowService - integration", () => {
  beforeAll(async () => {
    const registerService = new RegisterService();
    const loginService = new LoginService();
    const username = new Date().toISOString().replace(/[-:.]/g, "");
    await registerService.register(new UserDTO(username, "Ciao1234$"));
    const loginResponse = await loginService.login(new UserDTO(username, "Ciao1234$"));

    accessToken = loginResponse.accessToken;
    createWorkflowService = new CreateWorkflowService();
    deleteWorkflowService = new DeleteWorkflowService();
    allworkflowsService = new AllWorkflowsService();
    workflowName = "workflowName-" + new Date().toISOString().replace(/[-:.]/g, "")
  });

  let accessToken: string;
  let workflowName: string;
  let createWorkflowService: CreateWorkflowService;
  let deleteWorkflowService: DeleteWorkflowService;
  let allworkflowsService: AllWorkflowsService;

  test("Should return the list of workflows when successful", async () => {
    await createWorkflowService.newWorkflow(workflowName, accessToken)
    await expect(allworkflowsService.allWorkflows(accessToken)).resolves.toEqual([workflowName]);
    await deleteWorkflowService.deleteWorkflowByName(workflowName, accessToken);
  });

  test("Should throw an error if status != 200 is received", async () => {
    const invalidAccessToken = "invalid";
    await expect(allworkflowsService.allWorkflows(invalidAccessToken)).rejects.toThrowError("Generic error");
  });
});

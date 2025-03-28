import { expect, test, describe, beforeAll } from "vitest";
import { EdgeDTO, NodeDataDTO, NodeDTO, WorkflowDTO } from "../services/dto/WorkflowDTO";
import { RegisterService } from "../services/RegisterService";
import { UserDTO } from "../services/dto/userDTO";
import { LoginService } from "../services/LoginService";
import { SaveWorkflowService } from "../services/SaveWorkflowService";
import { CreateWorkflowService } from "../services/CreateWorkflowService";
import { DeleteWorkflowService } from "../services/DeleteWorkflowService";

describe("SaveWorkflowService - integration", () => {
  beforeAll(async () => {
    const registerService = new RegisterService();
    const loginService = new LoginService();
    const username = new Date().toISOString().replace(/[-:.]/g, "");
    await registerService.register(new UserDTO(username, "Ciao1234$"));
    const loginResponse = await loginService.login(new UserDTO(username, "Ciao1234$"));

    accessToken = loginResponse.accessToken;
    createWorkflowService = new CreateWorkflowService();
    saveWorkflowService = new SaveWorkflowService();
    deleteWorkflowService = new DeleteWorkflowService();
    workflow = new WorkflowDTO("workflowName-" + new Date().toISOString().replace(/[-:.]/g, ""), [new NodeDTO(0, { x: 1, y: 1 }, new NodeDataDTO("GMAIL")), new NodeDTO(1, { x: 1, y: 1 }, new NodeDataDTO("GMAIL"))], [new EdgeDTO("automate", 0, 1)]);
  });

  let accessToken: string;
  let workflow: WorkflowDTO;
  let createWorkflowService: CreateWorkflowService;
  let saveWorkflowService: SaveWorkflowService;
  let deleteWorkflowService: DeleteWorkflowService;

  test("TIF12 - Should return the just saved workflow", async () => {
    await createWorkflowService.newWorkflow(workflow.name, accessToken);
    await expect(saveWorkflowService.saveWorkflow(workflow, accessToken)).resolves.toEqual(workflow);
    await deleteWorkflowService.deleteWorkflowByName(workflow.name, accessToken);
  });

  test("TIF13 - Should throw an error with a message if status != 200 is received", async () => {
    await deleteWorkflowService.deleteWorkflowByName(workflow.name, accessToken).catch(() => {});
    await expect(saveWorkflowService.saveWorkflow(workflow, accessToken)).rejects.toThrowError("Workflow not found");
  });
});

import { expect, test, describe, beforeAll } from "vitest";
import { EdgeDTO, NodeDataDTO, NodeDTO, WorkflowDTO } from "../services/dto/WorkflowDTO";
import { RegisterService } from "../services/RegisterService";
import { UserDTO } from "../services/dto/userDTO";
import { LoginService } from "../services/LoginService";
import { SaveWorkflowService } from "../services/SaveWorkflowService";
import { GetWorkflowService } from "../services/GetWorkflowService";
import { CreateWorkflowService } from "../services/CreateWorkflowService";
import { DeleteWorkflowService } from "../services/DeleteWorkflowService";

describe("GetWorkflowService - integration", () => {
  beforeAll(async () => {
    const registerService = new RegisterService();
    const loginService = new LoginService();
    const username = new Date().toISOString().replace(/[-:.]/g, "");
    await registerService.register(new UserDTO(username, "Ciao1234$"));
    const loginResponse = await loginService.login(new UserDTO(username, "Ciao1234$"));

    accessToken = loginResponse.accessToken;
    getWorkflowService = new GetWorkflowService();
    createWorkflowService = new CreateWorkflowService();
    saveWorkflowService = new SaveWorkflowService();
    deleteWorkflowService = new DeleteWorkflowService();
    workflow = new WorkflowDTO("workflowName-" + new Date().toISOString().replace(/[-:.]/g, ""), [new NodeDTO(0, { x: 1, y: 1 }, new NodeDataDTO("GMAIL")), new NodeDTO(1, { x: 1, y: 1 }, new NodeDataDTO("GMAIL"))], [new EdgeDTO("automate", 0, 1)]);
  });

  let accessToken: string;
  let workflow: WorkflowDTO;
  let getWorkflowService: GetWorkflowService;
  let createWorkflowService: CreateWorkflowService;
  let saveWorkflowService: SaveWorkflowService;
  let deleteWorkflowService: DeleteWorkflowService;

  test("TIF7 - Should return the received workflow when one is received from backend", async () => {
    await createWorkflowService.newWorkflow(workflow.name, accessToken);
    await saveWorkflowService.saveWorkflow(workflow, accessToken);

    await expect(getWorkflowService.getWorkflow(workflow.name, accessToken)).resolves.toEqual(workflow);
    await deleteWorkflowService.deleteWorkflowByName(workflow.name, accessToken);
  });

    test("TIF8 - Should throw an error with a message if status != 200 is received", async () => {
    await deleteWorkflowService.deleteWorkflowByName(workflow.name, accessToken).catch(() => {});
    await expect(getWorkflowService.getWorkflow(workflow.name, accessToken)).rejects.toThrowError("Workflow not found");
  });
});

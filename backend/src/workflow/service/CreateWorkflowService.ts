import { Inject, Injectable } from "@nestjs/common";
import { CreateWorkflowUseCase } from "./port/input/CreateWorkflowUseCase";
import { CREATE_WORKFLOW_PORT, CreateWorkflowPort } from "./port/output/CreateWorkflowPort";
import { GET_WORKFLOW_PORT, GetWorkflowPort } from "./port/output/GetWorkflowPort";
import CreateWorkflowCommand from "../domain/CreateWorkflowCommand";
import { Workflow } from "../domain/Workflow";
import { WorkflowAlreadyExistsError, WorkflowNotAddedError } from "src/BusinessErrors";

@Injectable()
class CreateWorkflowService implements CreateWorkflowUseCase {
    constructor(
        @Inject(CREATE_WORKFLOW_PORT) private readonly createWorkflowPort: CreateWorkflowPort,
        @Inject(GET_WORKFLOW_PORT) private readonly getWorkflowPort: GetWorkflowPort
    ) {}

    // controlla se esiste già un workflow con lo stesso nome, se c'è allora lancia un errore, altrimenti crea il workflow con nodi vuoti
    async createWorkflow(cmd: CreateWorkflowCommand): Promise<Workflow> {
        const foundWorkflow = await this.getWorkflowPort.getWorkflowByName(cmd.username, cmd.workflowName);
        if (foundWorkflow) throw new WorkflowAlreadyExistsError();

        const workflow = new Workflow(cmd.workflowName, []);
        const addedWorkflow = await this.createWorkflowPort.addWorkflow(cmd.username, workflow);
        if (!addedWorkflow) throw new WorkflowNotAddedError();
        return addedWorkflow;
    }
}

export default CreateWorkflowService;

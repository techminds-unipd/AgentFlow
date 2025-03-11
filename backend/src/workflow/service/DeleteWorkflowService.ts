import { Inject, Injectable } from "@nestjs/common";
import { Workflow } from "../domain/Workflow";
import DeleteWorkflowCommand from "../domain/DeleteWorkflowCommand";
import { DeleteWorkflowUseCase } from "./port/input/DeleteWorkflowUseCase";
import { DELETE_WORKFLOW_PORT, DeleteWorkflowPort } from "./port/output/DeleteWorkflowPort";
//import { WorkflowNotFoundError } from "src/BusinessErrors";

@Injectable()
export class DeleteWorkflowService implements DeleteWorkflowUseCase {
    constructor(@Inject(DELETE_WORKFLOW_PORT) private readonly deleteWorkflowPort: DeleteWorkflowPort) {}

    async deleteWorkflow(cmd: DeleteWorkflowCommand): Promise<Workflow> {
        const deletedWorkflow = await this.deleteWorkflowPort.deleteWorkflow(cmd.username, cmd.workflowName);
        //if (!deletedWorkflow) throw new WorkflowNotFoundError();
        if (!deletedWorkflow) throw new Error("WorkflowNotFoundError");
        return deletedWorkflow;
    }
}

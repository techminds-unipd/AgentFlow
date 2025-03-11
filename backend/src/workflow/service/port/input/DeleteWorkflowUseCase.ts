import DeleteWorkflowCommand from "src/workflow/domain/DeleteWorkflowCommand";
import { Workflow } from "src/workflow/domain/Workflow";

export interface DeleteWorkflowUseCase {
    deleteWorkflow(cmd: DeleteWorkflowCommand): Promise<Workflow>;
}

export const DELETE_WORKFLOW_USE_CASE = "DELETE_WORKFLOW_USE_CASE";

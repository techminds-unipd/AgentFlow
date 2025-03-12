import CreateWorkflowCommand from "src/workflow/domain/CreateWorkflowCommand";
import { Workflow } from "src/workflow/domain/Workflow";

export interface CreateWorkflowUseCase {
    createWorkflow(cmd: CreateWorkflowCommand): Promise<Workflow>;
}

export const CREATE_WORKFLOW_USE_CASE = "CREATE_WORKFLOW_USE_CASE";

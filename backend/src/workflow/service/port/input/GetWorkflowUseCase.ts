import GetWorkflowCommand from "src/workflow/domain/GetWorkflowCommand";
import { Workflow } from "src/workflow/domain/Workflow";

export interface GetWorkflowUseCase {
    getWorkflow(cmd: GetWorkflowCommand): Promise<Workflow>;
}

export const GET_WORKFLOW_USE_CASE = "GET_WORKFLOW_USE_CASE";

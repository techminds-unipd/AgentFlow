import { Workflow } from "src/workflow/domain/Workflow";

export interface GetWorkflowPort {
    getWorkflowByName(username: string, workflowName: string): Promise<Workflow | null>;
}

export const GET_WORKFLOW_PORT = "GET_WORKFLOW_PORT";

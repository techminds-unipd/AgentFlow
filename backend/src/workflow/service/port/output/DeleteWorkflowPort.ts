import { Workflow } from "src/workflow/domain/Workflow";

export interface DeleteWorkflowPort {
    deleteWorkflow(username: string, workflowName: string): Promise<Workflow | null>;
}

export const DELETE_WORKFLOW_PORT = "DELETE_WORKFLOW_PORT";

import { Workflow } from "src/workflow/domain/Workflow";

export interface CreateWorkflowPort {
    addWorkflow(username: string, workflow: Workflow): Promise<Workflow | null>;
}

export const CREATE_WORKFLOW_PORT = "CREATE_WORKFLOW_PORT";

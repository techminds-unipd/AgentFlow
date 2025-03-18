import { Workflow } from "src/workflow/domain/Workflow";

export interface SaveWorkflowPort {
    saveWorkflow(username: string, workflow: Workflow): Promise<Workflow | null>;
}

export const SAVE_WORKFLOW_PORT = "SAVE_WORKFLOW_PORT";

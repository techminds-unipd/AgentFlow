import { Workflow } from "src/workflow/domain/Workflow";

export interface GetUserWorkflowPort {
    getAllWorkflowByUsername(username: string): Promise<Workflow[] | null>;
}

export const GET_USER_WORKFLOW_PORT = "GET_USER_WORKFLOW_PORT";

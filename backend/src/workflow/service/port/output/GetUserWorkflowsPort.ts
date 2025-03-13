import { Workflow } from "src/workflow/domain/Workflow";

export interface GetUserWorkflowsPort {
    getAllWorkflowByUsername(username: string): Promise<Workflow[] | null>;
}

export const GET_USER_WORKFLOWS_PORT = "GET_USER_WORKFLOWS_PORT";

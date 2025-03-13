export interface WorkflowNameListUseCase {
    getWorkflowNameList(username: string): Promise<string[]>;
}

export const WORKFLOW_NAME_LIST_USE_CASE = "WORKFLOW_NAME_LIST_USE_CASE";

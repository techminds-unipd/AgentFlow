import ExecuteWorkflowCommand from "src/workflow/domain/ExecuteWorkflowCommand";

export interface ExecuteWorkflowUseCase {
  executeWorkflow(cmd: ExecuteWorkflowCommand): Promise<string>;
}

export const EXECUTE_WORKFLOW_USE_CASE = "EXECUTE_WORKFLOW_USE_CASE";
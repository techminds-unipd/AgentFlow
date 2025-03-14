import Token from "src/accountConnection/domain/Token";
import { Workflow } from "src/workflow/domain/Workflow";

export interface ExecuteWorkflowPort {
  executeWorkflow(workflow: Workflow, googleToken: Token): Promise<string>;
}

export const EXECUTE_WORKFLOW_PORT = "EXECUTE_WORKFLOW_PORT";
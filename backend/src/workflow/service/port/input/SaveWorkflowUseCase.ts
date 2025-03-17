import SaveWorkflowCommand from "src/workflow/domain/SaveWorkflowCommand";
import { Workflow } from "src/workflow/domain/Workflow";

export interface SaveWorkflowUseCase {
    saveWorkflow(cmd: SaveWorkflowCommand): Promise<Workflow>;
}

export const SAVE_WORKFLOW_USE_CASE = "SAVE_WORKFLOW_USE_CASE";

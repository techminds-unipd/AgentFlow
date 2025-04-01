import { Inject, Injectable } from "@nestjs/common";
import { Workflow } from "../domain/Workflow";
import { WorkflowNotFoundError } from "src/BusinessErrors";
import { SaveWorkflowUseCase } from "./port/input/SaveWorkflowUseCase";
import SaveWorkflowCommand from "../domain/SaveWorkflowCommand";
import { SAVE_WORKFLOW_PORT, SaveWorkflowPort } from "./port/output/SaveWorkflowPort";

@Injectable()
export class SaveWorkflowService implements SaveWorkflowUseCase {
    constructor(@Inject(SAVE_WORKFLOW_PORT) private readonly saveWorkflowPort: SaveWorkflowPort) {}

    async saveWorkflow(cmd: SaveWorkflowCommand): Promise<Workflow> {
        const workflow = await this.saveWorkflowPort.saveWorkflow(cmd.username, cmd.workflow);
        if (!workflow) throw new WorkflowNotFoundError();
        return workflow;
    }
}

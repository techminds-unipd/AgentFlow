import { Inject, Injectable } from "@nestjs/common";
import { GetWorkflowUseCase } from "./port/input/GetWorkflowUseCase";
import { GET_WORKFLOW_PORT, GetWorkflowPort } from "./port/output/GetWorkflowPort";
import { Workflow } from "../domain/Workflow";
import GetWorkflowCommand from "../domain/GetWorkflowCommand";
import { WorkflowNotFoundError } from "src/BusinessErrors";

@Injectable()
export class GetWorkflowService implements GetWorkflowUseCase {
    constructor(@Inject(GET_WORKFLOW_PORT) private readonly getWorkflowPort: GetWorkflowPort) {}

    async getWorkflow(cmd: GetWorkflowCommand): Promise<Workflow> {
        const workflow = await this.getWorkflowPort.getWorkflowByName(cmd.username, cmd.workflowName);
        if (!workflow) throw new WorkflowNotFoundError();
        return workflow;
    }
}

import { Inject, Injectable } from "@nestjs/common";
import { ExecuteWorkflowUseCase } from "./port/input/ExecuteWorkflowUseCase";
import { EXECUTE_WORKFLOW_PORT, ExecuteWorkflowPort } from "./port/output/ExecuteWorkflowPort";
import ExecuteWorkflowCommand from "../domain/ExecuteWorkflowCommand";

@Injectable()
class ExecuteWorkflowService implements ExecuteWorkflowUseCase {
    constructor(@Inject(EXECUTE_WORKFLOW_PORT) private readonly executeWorkflowPort: ExecuteWorkflowPort) {}

    async executeWorkflow(cmd: ExecuteWorkflowCommand): Promise<string> {
        return await this.executeWorkflowPort.executeWorkflow(cmd.workflow, cmd.googleToken);
    }
}

export default ExecuteWorkflowService;

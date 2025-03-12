import { Inject, Injectable } from "@nestjs/common";
import { Workflow } from "../domain/Workflow";
import { GET_USER_WORKFLOW_PORT, GetUserWorkflowPort } from "./port/output/GetUserWorkflowsPort";
import { WorkflowNameListUseCase } from "./port/input/WorkflowNameListUseCase";
import { UserNotFoundError } from "src/BusinessErrors";


@Injectable()
export class WorkflowNameListService implements WorkflowNameListUseCase {
    constructor(@Inject(GET_USER_WORKFLOW_PORT) private readonly getUserWorkflowPort: GetUserWorkflowPort) {}

    async getWorkflowNameList(username: string): Promise<string[]> {
        const workflowNameList = await this.getUserWorkflowPort.getAllWorkflowByUsername(username);
        if (!workflowNameList) throw new UserNotFoundError();
        return workflowNameList.map((workflow) => workflow.name);
    }
}

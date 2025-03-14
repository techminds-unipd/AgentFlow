import { ApiProperty } from "@nestjs/swagger";
import { WorkflowDTO } from "./WorkflowDTO";
import TokenDTO from "src/accountConnection/adapter/input/TokenDTO";

class ExecuteWorkflowDTO {
    @ApiProperty({ type: WorkflowDTO })
    readonly workflow: WorkflowDTO;

    @ApiProperty({ type: TokenDTO })
    readonly googleToken: TokenDTO;

    constructor(workflow: WorkflowDTO, googleToken: TokenDTO) {
        this.workflow = workflow;
        this.googleToken = googleToken;
    }
}

export default ExecuteWorkflowDTO;

import { ApiProperty } from "@nestjs/swagger";
import JWT from "src/JWT";

class GetWorkflowDTO {
    @ApiProperty()
    readonly workflowName: string;

    @ApiProperty()
    readonly jwt: JWT;

    constructor(workflowName: string, jwt: JWT) {
        this.workflowName = workflowName;
        this.jwt = jwt;
    }
}

export default GetWorkflowDTO;

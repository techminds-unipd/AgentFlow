import Token from "src/accountConnection/domain/Token";
import { Workflow } from "./Workflow";

class ExecuteWorkflowCommand {
    readonly workflow: Workflow;
    readonly googleToken: Token;

    constructor(workflow: Workflow, googleToken: Token) {
        this.workflow = workflow;
        this.googleToken = googleToken;
    }
}

export default ExecuteWorkflowCommand;

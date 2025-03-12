import { Workflow } from "./Workflow";


export default class SaveWorkflowCommand {
    readonly username: string;
    readonly workflow: Workflow;

    constructor(username: string, workflow: Workflow) {
        this.username = username;
        this.workflow = workflow;
    }
}

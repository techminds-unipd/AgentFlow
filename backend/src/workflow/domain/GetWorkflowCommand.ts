export default class GetWorkflowCommand {
    readonly username: string;
    readonly workflowName: string;

    constructor(username: string, workflowName: string) {
        this.username = username;
        this.workflowName = workflowName;
    }
}

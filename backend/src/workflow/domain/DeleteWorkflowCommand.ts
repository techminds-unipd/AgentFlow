export default class DeleteWorkflowCommand {
    readonly username: string;
    readonly workflowName: string;

    constructor(username: string, workflowName: string) {
        this.username = username;
        this.workflowName = workflowName;
    }
}

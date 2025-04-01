class CreateWorkflowCommand {
    readonly workflowName: string;
    readonly username: string;

    constructor(workflowName: string, username: string) {
        this.workflowName = workflowName;
        this.username = username;
    }
}

export default CreateWorkflowCommand;

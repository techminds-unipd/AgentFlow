import { Model } from "mongoose";
import { WorkflowEntity } from "./WorkflowEntity";
import { UserEntity } from "src/user/adapter/output/UserEntity";
import { InjectModel } from "@nestjs/mongoose";

export class WorkflowRepository {
    constructor(
        @InjectModel(UserEntity.name)
        private readonly userEntityModel: Model<UserEntity>
    ) {}

    async getWorkflowByName(username: string, workflowName: string): Promise<WorkflowEntity | null> {
        const user = await this.userEntityModel
            .findOne({ username: username, "workflows.name": workflowName }, { "workflows.$": 1 })
            .exec();
        if (!user) return null;
        return user.workflows[0];
    }

    async deleteWorkflow(username: string, workflowName: string): Promise<WorkflowEntity | null> {
        const workflow = await this.getWorkflowByName(username, workflowName);
        // workflow non trovato
        if (!workflow) return null;
        const user = await this.userEntityModel
            .findOneAndUpdate({ username: username }, { $pull: { workflows: { name: workflowName } } }, { new: true })
            .exec();
        // user non trovato (impossibile, se vuoi per me si può togliere questo controllo perché se lo user non c'è allora esce nel controllo sopra)
        if (!user) return null;
        const deletedWorkflow = user.workflows.find((w) => w.name === workflowName);
        // workflow non cancellato
        if (deletedWorkflow) return null;
        return workflow;
    }

    async addWorkflow(username: string, workflow: WorkflowEntity): Promise<WorkflowEntity | null> {
        const user = await this.userEntityModel
            .findOneAndUpdate({ username: username }, { $push: { workflows: workflow } }, { new: true })
            .exec();
        if (!user) return null;
        const addedWorkflow = user.workflows.find((w) => w.name === workflow.name);
        if (!addedWorkflow) return null;
        return addedWorkflow;
    }

    async getAllWorkflowByUsername(username: string): Promise<WorkflowEntity[] | null> {
        const user = await this.userEntityModel.findOne({ username: username }).exec();
        if (!user) return null;
        return user.workflows;
    }
}

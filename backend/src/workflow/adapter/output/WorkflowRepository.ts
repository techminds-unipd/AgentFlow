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
}

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserEntity, userEntitySchema } from "src/user/adapter/output/UserEntity";
import { DELETE_WORKFLOW_USE_CASE } from "./service/port/input/DeleteWorkflowUseCase";
import { DeleteWorkflowService } from "./service/DeleteWorkflowService";
import { DELETE_WORKFLOW_PORT } from "./service/port/output/DeleteWorkflowPort";
import WorkflowPortAdapter from "./adapter/output/WorkflowPortAdapter";
import { WorkflowRepository } from "./adapter/output/WorkflowRepository";
import DeleteWorkflowController from "./adapter/input/DeleteWorkflowController";


@Module({
    imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: userEntitySchema }])],
    controllers: [DeleteWorkflowController],
    providers: [
        {provide: DELETE_WORKFLOW_USE_CASE, useClass: DeleteWorkflowService},
        {provide: DELETE_WORKFLOW_PORT, useClass: WorkflowPortAdapter},
        WorkflowRepository
    ]
})
export class WorkflowModule {}

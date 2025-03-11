import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserEntity, userEntitySchema } from "src/user/adapter/output/UserEntity";
import CreateWorkflowController from "./adapter/input/CreateWorkflowController";
import { CREATE_WORKFLOW_USE_CASE } from "./service/port/input/CreateWorkflowUseCase";
import CreateWorkflowService from "./service/CreateWorkflowService";
import { WorkflowRepository } from "./adapter/output/WorkflowRepository";
import { CREATE_WORKFLOW_PORT } from "./service/port/output/CreateWorkflowPort";
import { GET_WORKFLOW_PORT } from "./service/port/output/GetWorkflowPort";
import WorkflowPortAdapter from "./adapter/output/WorkflowPortAdapter";

@Module({
    imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: userEntitySchema }])],
    controllers: [CreateWorkflowController],
    providers: [
        { provide: CREATE_WORKFLOW_USE_CASE, useClass: CreateWorkflowService },
        { provide: CREATE_WORKFLOW_PORT, useClass: WorkflowPortAdapter },
        { provide: GET_WORKFLOW_PORT, useClass: WorkflowPortAdapter },
        WorkflowRepository
    ]
})
export class WorkflowModule {}

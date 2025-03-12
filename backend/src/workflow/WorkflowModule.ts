import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import CreateWorkflowController from "./adapter/input/CreateWorkflowController";
import { CREATE_WORKFLOW_USE_CASE } from "./service/port/input/CreateWorkflowUseCase";
import CreateWorkflowService from "./service/CreateWorkflowService";
import { CREATE_WORKFLOW_PORT } from "./service/port/output/CreateWorkflowPort";
import GetWorkflowController from "./adapter/input/GetWorkflowController";
import { GET_WORKFLOW_USE_CASE } from "./service/port/input/GetWorkflowUseCase";
import { GET_WORKFLOW_PORT } from "./service/port/output/GetWorkflowPort";
import WorkflowPortAdapter from "./adapter/output/WorkflowPortAdapter";
import { GetWorkflowService } from "./service/GetWorkflowService";
import { WorkflowRepository } from "./adapter/output/WorkflowRepository";
import { UserEntity, userEntitySchema } from "src/user/adapter/output/UserEntity";

@Module({
    imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: userEntitySchema }])],
    controllers: [CreateWorkflowController, GetWorkflowController],
    providers: [
        { provide: CREATE_WORKFLOW_USE_CASE, useClass: CreateWorkflowService },
        { provide: CREATE_WORKFLOW_PORT, useClass: WorkflowPortAdapter },
        { provide: GET_WORKFLOW_USE_CASE, useClass: GetWorkflowService },
        { provide: GET_WORKFLOW_PORT, useClass: WorkflowPortAdapter },
        WorkflowRepository
    ]
})
export class WorkflowModule {}




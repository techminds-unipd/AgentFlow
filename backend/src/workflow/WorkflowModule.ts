import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import GetWorkflowController from "./adapter/input/GetWorkflowController";
import { GET_WORKFLOW_USE_CASE } from "./service/port/input/GetWorkflowUseCase";
import { GET_WORKFLOW_PORT } from "./service/port/output/GetWorkflowPort";
import WorkflowPortAdapter from "./adapter/output/WorkflowPortAdapter";
import { GetWorkflowService } from "./service/GetWorkflowService";
import { WorkflowRepository } from "./adapter/output/WorkflowRepository";
import { UserEntity, userEntitySchema } from "src/user/adapter/output/UserEntity";

@Module({
    imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: userEntitySchema }])],
    controllers: [GetWorkflowController],
    providers: [
        { provide: GET_WORKFLOW_USE_CASE, useClass: GetWorkflowService },
        { provide: GET_WORKFLOW_PORT, useClass: WorkflowPortAdapter },
        WorkflowRepository
    ]
})
export class WorkflowModule {}

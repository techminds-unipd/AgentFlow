import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DELETE_WORKFLOW_USE_CASE } from "./service/port/input/DeleteWorkflowUseCase";
import { DeleteWorkflowService } from "./service/DeleteWorkflowService";
import { DELETE_WORKFLOW_PORT } from "./service/port/output/DeleteWorkflowPort";
import WorkflowPortAdapter from "./adapter/output/WorkflowPortAdapter";
import DeleteWorkflowController from "./adapter/input/DeleteWorkflowController";
import CreateWorkflowController from "./adapter/input/CreateWorkflowController";
import { CREATE_WORKFLOW_USE_CASE } from "./service/port/input/CreateWorkflowUseCase";
import CreateWorkflowService from "./service/CreateWorkflowService";
import { CREATE_WORKFLOW_PORT } from "./service/port/output/CreateWorkflowPort";
import GetWorkflowController from "./adapter/input/GetWorkflowController";
import { GET_WORKFLOW_USE_CASE } from "./service/port/input/GetWorkflowUseCase";
import { GET_WORKFLOW_PORT } from "./service/port/output/GetWorkflowPort";
import { GetWorkflowService } from "./service/GetWorkflowService";
import { WorkflowRepository } from "./adapter/output/WorkflowRepository";
import { UserEntity, userEntitySchema } from "src/user/adapter/output/UserEntity";
import { SAVE_WORKFLOW_PORT } from "./service/port/output/SaveWorkflowPort";
import { SAVE_WORKFLOW_USE_CASE } from "./service/port/input/SaveWorkflowUseCase";
import { SaveWorkflowService } from "./service/SaveWorkflowService";
import SaveWorkflowController from "./adapter/input/SaveWorkflowController";
import { WorkflowDTOValidator } from "./adapter/input/WorkflowDTOValidator";
import { GET_USER_WORKFLOWS_PORT } from "./service/port/output/GetUserWorkflowsPort";
import { WorkflowNameListService } from "./service/WorkflowNameListService";
import WorkflowNameListController from "./adapter/input/WorkflowNameListController";
import { WORKFLOW_NAME_LIST_USE_CASE } from "./service/port/input/WorkflowNameListUseCase";

@Module({
    imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: userEntitySchema }])],
    controllers: [
        CreateWorkflowController,
        GetWorkflowController,
        WorkflowNameListController,
        DeleteWorkflowController,
        SaveWorkflowController
    ],
    providers: [
        { provide: DELETE_WORKFLOW_USE_CASE, useClass: DeleteWorkflowService },
        { provide: DELETE_WORKFLOW_PORT, useClass: WorkflowPortAdapter },
        { provide: CREATE_WORKFLOW_USE_CASE, useClass: CreateWorkflowService },
        { provide: CREATE_WORKFLOW_PORT, useClass: WorkflowPortAdapter },
        { provide: GET_WORKFLOW_USE_CASE, useClass: GetWorkflowService },
        { provide: GET_WORKFLOW_PORT, useClass: WorkflowPortAdapter },
        { provide: WORKFLOW_NAME_LIST_USE_CASE, useClass: WorkflowNameListService },
        { provide: GET_USER_WORKFLOWS_PORT, useClass: WorkflowPortAdapter },
        { provide: SAVE_WORKFLOW_USE_CASE, useClass: SaveWorkflowService },
        { provide: SAVE_WORKFLOW_PORT, useClass: WorkflowPortAdapter },
        WorkflowDTOValidator,
        WorkflowRepository
    ]
})
export class WorkflowModule {}

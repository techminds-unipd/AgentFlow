import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserEntity, userEntitySchema } from "src/user/adapter/output/UserEntity";
import { DELETE_WORKFLOW_USE_CASE } from "./service/port/input/DeleteWorkflowUseCase";
import { DeleteWorkflowService } from "./service/DeleteWorkflowService";
import { DELETE_WORKFLOW_PORT } from "./service/port/output/DeleteWorkflowPort";
import WorkflowPortAdapter from "./adapter/output/WorkflowPortAdapter";
import { WorkflowRepository } from "./adapter/output/WorkflowRepository";
import DeleteWorkflowController from "./adapter/input/DeleteWorkflowController";
import CreateWorkflowController from "./adapter/input/CreateWorkflowController";
import { CREATE_WORKFLOW_USE_CASE } from "./service/port/input/CreateWorkflowUseCase";
import CreateWorkflowService from "./service/CreateWorkflowService";
import { CREATE_WORKFLOW_PORT } from "./service/port/output/CreateWorkflowPort";
import GetWorkflowController from "./adapter/input/GetWorkflowController";
import { GET_WORKFLOW_USE_CASE } from "./service/port/input/GetWorkflowUseCase";
import { GET_WORKFLOW_PORT } from "./service/port/output/GetWorkflowPort";
import { GetWorkflowService } from "./service/GetWorkflowService";
import { GET_USER_WORKFLOWS_PORT } from "./service/port/output/GetUserWorkflowsPort";
import { WorkflowNameListService } from "./service/WorkflowNameListService";
import WorkflowNameListController from "./adapter/input/WorkflowNameListController";
import { WORKFLOW_NAME_LIST_USE_CASE } from "./service/port/input/WorkflowNameListUseCase";
import ExecuteWorkflowController from "./adapter/input/ExecuteWorkflowController";
import { EXECUTE_WORKFLOW_USE_CASE } from "./service/port/input/ExecuteWorkflowUseCase";
import ExecuteWorkflowService from "./service/ExecuteWorkflowService";
import { EXECUTE_WORKFLOW_PORT } from "./service/port/output/ExecuteWorkflowPort";
import WorkflowAgentAdapter from "./adapter/output/WorkflowAgentAdapter";
import AgentRepository from "./adapter/output/AgentRepository";
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: userEntitySchema }]), HttpModule, ConfigModule],
    controllers: [
        CreateWorkflowController,
        GetWorkflowController,
        WorkflowNameListController,
        DeleteWorkflowController,
        ExecuteWorkflowController
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
        { provide: EXECUTE_WORKFLOW_USE_CASE, useClass: ExecuteWorkflowService},
        { provide: EXECUTE_WORKFLOW_PORT, useClass: WorkflowAgentAdapter},
        WorkflowRepository,
        AgentRepository 
    ]
})
export class WorkflowModule {}

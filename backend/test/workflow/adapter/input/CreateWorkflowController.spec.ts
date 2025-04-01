import { Test, TestingModule } from "@nestjs/testing";
import CreateWorkflowController from "src/workflow/adapter/input/CreateWorkflowController";
import { CREATE_WORKFLOW_USE_CASE } from "src/workflow/service/port/input/CreateWorkflowUseCase";
import { JwtService } from "@nestjs/jwt";
import { Workflow } from "src/workflow/domain/Workflow";
import { WorkflowDTO } from "src/workflow/adapter/input/WorkflowDTO";
import { HttpException, HttpStatus } from "@nestjs/common";
import { WorkflowAlreadyExistsError, WorkflowNotAddedError } from "src/BusinessErrors";
import { MongooseError } from "mongoose";

describe("CreateWorkflowController", () => {
    let createWorkflowController: CreateWorkflowController;
    let createWorkflowUseCaseMock: { createWorkflow: jest.Mock };
    let jwtService: { verifyAsync: jest.Mock };
    const workflowMock = new Workflow("prova", []);
    const requestMock = { username: "gianni" };
    const workflowDTOMock = new WorkflowDTO("prova", [], []);

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CreateWorkflowController],
            providers: [
                { provide: CREATE_WORKFLOW_USE_CASE, useValue: createWorkflowUseCaseMock },
                { provide: JwtService, useValue: jwtService }
            ]
        }).compile();
        createWorkflowController = module.get<CreateWorkflowController>(CreateWorkflowController);
    };

    beforeEach(async () => {
        createWorkflowUseCaseMock = { createWorkflow: jest.fn() };
        jwtService = { verifyAsync: jest.fn() };
        await createTestingModule();
    });

    describe("createWorkflow", () => {
        it("TUB28 - should create the workflow", async () => {
            createWorkflowUseCaseMock.createWorkflow.mockResolvedValue(workflowMock);
            expect(await createWorkflowController.createWorkflow("prova", requestMock)).toEqual(workflowDTOMock);
        });

        it("TUB29 - should throw HttpException because workflow with the same name already exists", async () => {
            createWorkflowUseCaseMock.createWorkflow.mockImplementation(() => {
                throw new WorkflowAlreadyExistsError();
            });
            const result = createWorkflowController.createWorkflow("prova", requestMock);
            expect(result).rejects.toThrow(HttpException);
            expect(result).rejects.toHaveProperty("status", HttpStatus.BAD_REQUEST);
        });

        it("TUB30 - should throw HttpException because workflow not been added to the database", async () => {
            createWorkflowUseCaseMock.createWorkflow.mockImplementation(() => {
                throw new WorkflowNotAddedError();
            });
            const result = createWorkflowController.createWorkflow("prova", requestMock);
            expect(result).rejects.toThrow(HttpException);
            expect(result).rejects.toHaveProperty("status", HttpStatus.INTERNAL_SERVER_ERROR);
        });

        it("TUB31 - should throw HttpException because the database throws an exception", async () => {
            createWorkflowUseCaseMock.createWorkflow.mockImplementation(() => {
                throw new MongooseError("");
            });
            const result = createWorkflowController.createWorkflow("prova", requestMock);
            expect(result).rejects.toThrow(HttpException);
            expect(result).rejects.toHaveProperty("status", HttpStatus.INTERNAL_SERVER_ERROR);
        });

    });
});

import { Test, TestingModule } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { EdgeDTO, NodeDataDTO, NodeDTO, PositionDTO, WorkflowDTO } from "src/workflow/adapter/input/WorkflowDTO";
import { HttpException, HttpStatus } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import ExecuteWorkflowDTO from "src/workflow/adapter/input/ExecuteWorkflowDTO";
import TokenDTO from "src/accountConnection/adapter/input/TokenDTO";
import ExecuteWorkflowController from "src/workflow/adapter/input/ExecuteWorkflowController";
import { EXECUTE_WORKFLOW_USE_CASE } from "src/workflow/service/port/input/ExecuteWorkflowUseCase";
import WorkflowDTOValidator from "src/workflow/adapter/input/WorkflowDTOValidator";
import WorkflowAdapterImplementation from "src/workflow/adapter/input/WorkflowAdapterImplementation";

describe("ExecuteWorkflowController", () => {
    let executeWorkflowController: ExecuteWorkflowController;
    let executeWorkflowUseCaseMock: { executeWorkflow: jest.Mock };
    let jwtService: { verifyAsync: jest.Mock };
    let httpService: { get: jest.Mock };
    let workflowDTOValidatorMock: { validate: jest.Mock };
    let workflowAdapterImplementationMock: { toDomain: jest.Mock };
    const googleTokenDTOMock = new TokenDTO("token", "refreshToken", new Date());
    const workflowDTOMock = new WorkflowDTO("prova", [
        new NodeDTO(9, new PositionDTO(3, 3), new NodeDataDTO("PASTEBIN")),
        new NodeDTO(4, new PositionDTO(1, 1), new NodeDataDTO("GCALENDAR")),
        new NodeDTO(7, new PositionDTO(2, 2), new NodeDataDTO("GMAIL"))
    ], [
        new EdgeDTO("action2", 4, 7),
        new EdgeDTO("action1", 7, 9)
    ]);
    const executeRequestMock = new ExecuteWorkflowDTO(workflowDTOMock, googleTokenDTOMock);
    jest.spyOn(ExecuteWorkflowController.prototype as any, 'validate').mockImplementation(() => {});

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ExecuteWorkflowController],
            providers: [
                { provide: EXECUTE_WORKFLOW_USE_CASE, useValue: executeWorkflowUseCaseMock },
                { provide: JwtService, useValue: jwtService },
                { provide: WorkflowDTOValidator, useValue: workflowDTOValidatorMock },
                { provide: WorkflowAdapterImplementation, useValue: workflowAdapterImplementationMock },
                { provide: HttpService, useValue: httpService }
            ]
        }).compile();
        executeWorkflowController = module.get<ExecuteWorkflowController>(ExecuteWorkflowController);
    };

    beforeEach(async () => {
        executeWorkflowUseCaseMock = { executeWorkflow: jest.fn() };
        jwtService = { verifyAsync: jest.fn() };
        workflowDTOValidatorMock = { validate: jest.fn() };
        workflowAdapterImplementationMock = { toDomain: jest.fn() };
        httpService = { get: jest.fn() };
        await createTestingModule();
    });

    describe("executeWorkflow", () => {
        it("should execute the workflow", async () => {
            workflowDTOValidatorMock.validate.mockImplementation(() => {});
            workflowAdapterImplementationMock.toDomain.mockImplementation(() => {});
            executeWorkflowUseCaseMock.executeWorkflow.mockResolvedValue("result");
            expect(await executeWorkflowController.executeWorkflow(executeRequestMock)).toEqual("result");
        });

        it("should throw HttpException because the workflowDTO is invalid", async () => {
            workflowDTOValidatorMock.validate.mockImplementation(() => {
                throw new HttpException("", HttpStatus.PRECONDITION_FAILED);
            });
            const result = executeWorkflowController.executeWorkflow(executeRequestMock);
            expect(result).rejects.toThrow(HttpException);
            expect(result).rejects.toHaveProperty("status", HttpStatus.PRECONDITION_FAILED);
        });

        it("should throw an exception because the execution had a problem", async () => {
            executeWorkflowUseCaseMock.executeWorkflow.mockImplementation(() => {
                throw new Error();
            });
            const result = executeWorkflowController.executeWorkflow(executeRequestMock);
            expect(result).rejects.toThrow(HttpException);
            expect(result).rejects.toHaveProperty("status", HttpStatus.INTERNAL_SERVER_ERROR);
        });
    });
});

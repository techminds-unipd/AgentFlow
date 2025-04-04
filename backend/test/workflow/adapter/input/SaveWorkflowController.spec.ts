import { Test, TestingModule } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { MongooseError } from "mongoose";
import { HttpException, HttpStatus } from "@nestjs/common";
import { WorkflowNotFoundError } from "src/BusinessErrors";
import { Node, NodeType, Point, Workflow } from "src/workflow/domain/Workflow";
import { EdgeDTO, NodeDataDTO, NodeDTO, PositionDTO, WorkflowDTO } from "src/workflow/adapter/input/WorkflowDTO";
import SaveWorkflowController from "src/workflow/adapter/input/SaveWorkflowController";
import WorkflowDTOValidator from "src/workflow/adapter/input/WorkflowDTOValidator";
import { SAVE_WORKFLOW_USE_CASE } from "src/workflow/service/port/input/SaveWorkflowUseCase";
import WorkflowAdapterImplementation from "src/workflow/adapter/input/WorkflowAdapterImplementation";

describe("SaveWorkflowController", () => {
    let saveWorkflowController: SaveWorkflowController;
    let saveWorkflowUseCaseMock: { saveWorkflow: jest.Mock };
    let workflowDTOValidatorMock: { validate: jest.Mock };
    let workflowAdapterImplementationMock: { toDTO: jest.Mock, toDomain: jest.Mock };
    let jwtService: { verifyAsync: jest.Mock };
    const workflowMock = new Workflow("prova", [
        new Node(NodeType.GCalendar, "action1", new Point(1, 1)),
        new Node(NodeType.Gmail, "action2", new Point(2, 2)),
        new Node(NodeType.Pastebin, "", new Point(3, 3))
    ]);
    const workflowDTOMock = new WorkflowDTO("prova", [
        new NodeDTO(9, new PositionDTO(3, 3), new NodeDataDTO("PASTEBIN")),
        new NodeDTO(4, new PositionDTO(1, 1), new NodeDataDTO("GCALENDAR")),
        new NodeDTO(7, new PositionDTO(2, 2), new NodeDataDTO("GMAIL"))
    ], [
        new EdgeDTO("action2", 7, 9),
        new EdgeDTO("action1", 4, 7)
    ]);

    const workflowDTOOrderedMock = new WorkflowDTO("prova", [
        new NodeDTO(0, new PositionDTO(1, 1), new NodeDataDTO("GCALENDAR")),
        new NodeDTO(1, new PositionDTO(2, 2), new NodeDataDTO("GMAIL")),
        new NodeDTO(2, new PositionDTO(3, 3), new NodeDataDTO("PASTEBIN"))
    ], [
        new EdgeDTO("action1", 0, 1),
        new EdgeDTO("action2", 1, 2)
    ]);

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SaveWorkflowController],
            providers: [
                { provide: SAVE_WORKFLOW_USE_CASE, useValue: saveWorkflowUseCaseMock },
                { provide: WorkflowDTOValidator, useValue: workflowDTOValidatorMock },
                { provide: WorkflowAdapterImplementation, useValue: workflowAdapterImplementationMock },
                { provide: JwtService, useValue: jwtService }
            ]
        }).compile();
        saveWorkflowController = module.get<SaveWorkflowController>(SaveWorkflowController);
    };

    beforeEach(async () => {
        saveWorkflowUseCaseMock = { saveWorkflow: jest.fn() };
        workflowDTOValidatorMock = { validate: jest.fn() };
        workflowAdapterImplementationMock = { toDTO: jest.fn(), toDomain: jest.fn() };
        jwtService = { verifyAsync: jest.fn() };
        await createTestingModule();
    });

    describe("saveWorkflow", () => {
        it("TUB45 - should return the saved workflow", async () => {
            saveWorkflowUseCaseMock.saveWorkflow.mockResolvedValue(workflowMock);
            workflowAdapterImplementationMock.toDTO.mockResolvedValue(workflowDTOOrderedMock);
            workflowAdapterImplementationMock.toDomain.mockResolvedValue(workflowMock);
            workflowDTOValidatorMock.validate.mockImplementation(() => {});
            expect(await saveWorkflowController.saveWorkflow(workflowDTOMock, { username: "username" })).toEqual(workflowDTOOrderedMock);
        });
        
        it("TUB46 - should throw HttpException because the database throws an exception", async () => {
            saveWorkflowUseCaseMock.saveWorkflow.mockImplementation(() => {
                throw new MongooseError("");
            });
            const result = saveWorkflowController.saveWorkflow(workflowDTOMock, { username: "username" });
            expect(result).rejects.toThrow(HttpException);
            expect(result).rejects.toHaveProperty("status", HttpStatus.INTERNAL_SERVER_ERROR);
        });

        it("TUB47 - should throw HttpException because the workflow was not found in the database", async () => {
            saveWorkflowUseCaseMock.saveWorkflow.mockImplementation(() => {
                throw new WorkflowNotFoundError;
            });
            const result = saveWorkflowController.saveWorkflow(workflowDTOMock, { username: "username" });
            expect(result).rejects.toThrow(HttpException);
            expect(result).rejects.toHaveProperty("status", HttpStatus.NOT_FOUND);
        });
        
        it("TUB48 - should throw HttpException because the workflowDTO is invalid", async () => {
            workflowDTOValidatorMock.validate.mockImplementation(() => {
                throw new HttpException("", HttpStatus.PRECONDITION_FAILED);
            });
            const result = saveWorkflowController.saveWorkflow(workflowDTOMock, { username: "username" });
            expect(result).rejects.toThrow(HttpException);
            expect(result).rejects.toHaveProperty("status", HttpStatus.PRECONDITION_FAILED);
        });
    });
});
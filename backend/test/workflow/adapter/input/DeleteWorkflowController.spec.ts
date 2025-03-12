import { Test, TestingModule } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { MongooseError } from "mongoose";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Node, NodeType, Point, Workflow } from "src/workflow/domain/Workflow";
import { EdgeDTO, NodeDataDTO, NodeDTO, PositionDTO, WorkflowDTO } from "src/workflow/adapter/input/WorkflowDTO";
import DeleteWorkflowController from "src/workflow/adapter/input/DeleteWorkflowController";
import { DELETE_WORKFLOW_USE_CASE } from "src/workflow/service/port/input/DeleteWorkflowUseCase";
import { WorkflowNotFoundError } from "src/BusinessErrors";

describe("DeleteWorkflowController", () => {
    let deleteWorkflowController: DeleteWorkflowController;
    let deleteWorkflowUseCaseMock: { deleteWorkflow: jest.Mock };
    let jwtService: { verifyAsync: jest.Mock };
    const workflowMock = new Workflow("prova", [
        new Node(NodeType.GCalendar, "action1", new Point(1, 1)),
        new Node(NodeType.Gmail, "action2", new Point(2, 2)),
        new Node(NodeType.Pastebin, "", new Point(3, 3))
    ]);
    const workflowDTOMock = new WorkflowDTO("prova", [
        new NodeDTO(0, new PositionDTO(1, 1), new NodeDataDTO("GCALENDAR")),
        new NodeDTO(1, new PositionDTO(2, 2), new NodeDataDTO("GMAIL")),
        new NodeDTO(2, new PositionDTO(3, 3), new NodeDataDTO("PASTEBIN"))
    ], [
        new EdgeDTO("action1", 0, 1),
        new EdgeDTO("action2", 1, 2)
    ]);

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DeleteWorkflowController],
            providers: [
                { provide: DELETE_WORKFLOW_USE_CASE, useValue: deleteWorkflowUseCaseMock },
                { provide: JwtService, useValue: jwtService }
            ]
        }).compile();
        deleteWorkflowController = module.get<DeleteWorkflowController>(DeleteWorkflowController);
    };

    beforeEach(async () => {
        deleteWorkflowUseCaseMock = { deleteWorkflow: jest.fn() };
        jwtService = { verifyAsync: jest.fn() };
        await createTestingModule();
    });

    describe("deleteWorkflow", () => {
        it("should delete the workflow by its name", async () => {
            deleteWorkflowUseCaseMock.deleteWorkflow.mockResolvedValue(workflowMock);
            expect(await deleteWorkflowController.deleteWorkflow("prova", { username: "username" })).toEqual(workflowDTOMock);
        });

        it("should throw HttpException because the database throws an exception", async () => {
            deleteWorkflowUseCaseMock.deleteWorkflow.mockImplementation(() => {
                throw new MongooseError("");
            });
            const result = deleteWorkflowController.deleteWorkflow("prova", { username: "username" });

            expect(result).rejects.toThrow(HttpException);
            expect(result).rejects.toHaveProperty("status", HttpStatus.INTERNAL_SERVER_ERROR);
        });

        it("should throw HttpException because the workflow was not found in the database", async () => {
            deleteWorkflowUseCaseMock.deleteWorkflow.mockImplementation(() => {
                throw new WorkflowNotFoundError;
            });
            const result = deleteWorkflowController.deleteWorkflow("prova", { username: "username" });
            expect(result).rejects.toThrow(HttpException);
            expect(result).rejects.toHaveProperty("status", HttpStatus.BAD_REQUEST);
        });

    });
});

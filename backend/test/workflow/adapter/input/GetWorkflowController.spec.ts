import { Test, TestingModule } from "@nestjs/testing";
import User from "src/user/domain/User";
import UserDTO from "src/user/adapter/input/UserDTO";
import { JwtService } from "@nestjs/jwt";
import { LOGIN_USE_CASE } from "src/user/service/port/input/LoginUseCase";
import LoginController from "src/user/adapter/input/LoginController";
import { MongooseError } from "mongoose";
import { HttpException, HttpStatus } from "@nestjs/common";
import { UserNotFoundError, WorkflowNotFoundError, WrongPasswordError } from "src/BusinessErrors";
import GetWorkflowController from "src/workflow/adapter/input/GetWorkflowController";
import { Node, NodeType, Point, Workflow } from "src/workflow/domain/Workflow";
import { GET_WORKFLOW_USE_CASE } from "src/workflow/service/port/input/GetWorkflowUseCase";
import { EdgeDTO, NodeDataDTO, NodeDTO, PositionDTO, WorkflowDTO } from "src/workflow/adapter/input/WorkflowDTO";

describe("GetWorkflowController", () => {
    let getWorkflowController: GetWorkflowController;
    let getWorkflowUseCaseMock: { getWorkflow: jest.Mock };
    let jwtService: { verifyAsync: jest.Mock };
    const workflowNodesMock: Node[] = [
        new Node(NodeType.GCalendar, "action1", new Point(1, 1)),
        new Node(NodeType.Gmail, "action2", new Point(2, 2)),
        new Node(NodeType.Pastebin, "", new Point(3, 3))
    ];
    const workflowMock = new Workflow("prova", workflowNodesMock);
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
            controllers: [GetWorkflowController],
            providers: [
                { provide: GET_WORKFLOW_USE_CASE, useValue: getWorkflowUseCaseMock },
                { provide: JwtService, useValue: jwtService }
            ]
        }).compile();
        getWorkflowController = module.get<GetWorkflowController>(GetWorkflowController);
    };

    beforeEach(async () => {
        getWorkflowUseCaseMock = { getWorkflow: jest.fn() };
        jwtService = { verifyAsync: jest.fn() };
        await createTestingModule();
    });

    describe("getWorkflow", () => {
        it("should get the workflow by its name", async () => {
            getWorkflowUseCaseMock.getWorkflow.mockResolvedValue(workflowMock);
            expect(await getWorkflowController.getWorkflow("prova", { username: "username" })).toEqual(workflowDTOMock);
        });
        
        it("should throw HttpException because the database throws an exception", async () => {
            getWorkflowUseCaseMock.getWorkflow.mockImplementation(() => {
                throw new MongooseError("");
            });
            const result = getWorkflowController.getWorkflow("prova", { username: "username" });
            expect(result).rejects.toThrow(HttpException);
            expect(result).rejects.toHaveProperty("status", HttpStatus.INTERNAL_SERVER_ERROR);
        });

        it("should throw HttpException because the workflow was not found in the database", async () => {
            getWorkflowUseCaseMock.getWorkflow.mockImplementation(() => {
                throw new WorkflowNotFoundError;
            });
            const result = getWorkflowController.getWorkflow("prova", { username: "username" });
            expect(result).rejects.toThrow(HttpException);
            expect(result).rejects.toHaveProperty("status", HttpStatus.BAD_REQUEST);
        });
        
    });
});

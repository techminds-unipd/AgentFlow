import { Test, TestingModule } from "@nestjs/testing";
import { UserNotFoundError } from "src/BusinessErrors";
import { Node, NodeType, Point, Workflow } from "src/workflow/domain/Workflow";
import { GET_USER_WORKFLOWS_PORT } from "src/workflow/service/port/output/GetUserWorkflowsPort";
import { WorkflowNameListService } from "src/workflow/service/WorkflowNameListService";

describe("WorkflowNameListService", () => {
    let workflowNameListService: WorkflowNameListService;
    let getUserWorkflowsPortMock: { getAllWorkflowByUsername: jest.Mock };
    const workflowNameListMock: string[] = ["prova", "prova2", "prova3"];
    const workflowMock: Workflow[] = [
        new Workflow("prova", [
            new Node(NodeType.GCalendar, "action1", new Point(1, 1)),
            new Node(NodeType.Gmail, "action2", new Point(2, 2)),
            new Node(NodeType.Pastebin, "", new Point(3, 3))
        ]),
        new Workflow("prova2", [
            new Node(NodeType.GCalendar, "action1", new Point(1, 1)),
            new Node(NodeType.Gmail, "action2", new Point(2, 2)),
            new Node(NodeType.Pastebin, "", new Point(3, 3))
        ]),
        new Workflow("prova3", [
            new Node(NodeType.GCalendar, "action1", new Point(1, 1)),
            new Node(NodeType.Gmail, "action2", new Point(2, 2)),
            new Node(NodeType.Pastebin, "", new Point(3, 3))
        ])
    ];

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WorkflowNameListService, { provide: GET_USER_WORKFLOWS_PORT, useValue: getUserWorkflowsPortMock }]
        }).compile();
        workflowNameListService = module.get<WorkflowNameListService>(WorkflowNameListService);
    };

    beforeEach(async () => {
        getUserWorkflowsPortMock = { getAllWorkflowByUsername: jest.fn() };
        await createTestingModule();
    });

    describe("getWorkflowNameList", () => {
        it("should get all the workflow names of a user", async () => {
            getUserWorkflowsPortMock.getAllWorkflowByUsername.mockResolvedValue(workflowMock);
            expect(await workflowNameListService.getWorkflowNameList("username")).toEqual(workflowNameListMock);
        });

        it("should get an empty list if there isn't any workflows", async () => {
            getUserWorkflowsPortMock.getAllWorkflowByUsername.mockResolvedValue([] as Workflow[]);
            expect(await workflowNameListService.getWorkflowNameList("username")).toEqual([] as string[]);
        });

        it("shouldn't find the workflow names because user doesn't exist", async () => {
            getUserWorkflowsPortMock.getAllWorkflowByUsername.mockResolvedValue(null);
            expect(workflowNameListService.getWorkflowNameList("username")).rejects.toThrow(UserNotFoundError);
        });
    });
});
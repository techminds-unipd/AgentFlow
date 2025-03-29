import { Test, TestingModule } from "@nestjs/testing";
import { EXECUTE_WORKFLOW_PORT } from "src/workflow/service/port/output/ExecuteWorkflowPort";
import ExecuteWorkflowService from "src/workflow/service/ExecuteWorkflowService";
import ExecuteWorkflowCommand from "src/workflow/domain/ExecuteWorkflowCommand";
import { Node, NodeType, Point, Workflow } from "src/workflow/domain/Workflow";
import Token from "src/accountConnection/domain/Token";

describe("ExecuteWorkflowService", () => {
    let executeWorkflowService: ExecuteWorkflowService;
    let executeWorkflowPortMock: { executeWorkflow: jest.Mock };
    const googleTokenMock = new Token("token", "refreshToken", new Date());
    const workflowMock = new Workflow("prova", [
        new Node(NodeType.GCalendar, "action1", new Point(1, 1)),
        new Node(NodeType.Gmail, "action2", new Point(2, 2)),
        new Node(NodeType.Pastebin, "", new Point(3, 3))
    ]);
    const executeWorkflowCommandMock = new ExecuteWorkflowCommand(workflowMock, googleTokenMock);

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                { provide: EXECUTE_WORKFLOW_PORT, useValue: executeWorkflowPortMock },
                ExecuteWorkflowService
            ]
        }).compile();
        executeWorkflowService = module.get<ExecuteWorkflowService>(ExecuteWorkflowService);
    };

    beforeEach(async () => {
        executeWorkflowPortMock = { executeWorkflow: jest.fn() };
        await createTestingModule();
    });

    describe("executeWorkflow", () => {
        it("TUB82 - should execute the workflow", async () => {
            executeWorkflowPortMock.executeWorkflow.mockResolvedValue("result");
            expect(await executeWorkflowService.executeWorkflow(executeWorkflowCommandMock)).toEqual("result");
        });
    });
});

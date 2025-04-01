import { Test, TestingModule } from "@nestjs/testing";
import { Node, NodeType, Point, Workflow } from "src/workflow/domain/Workflow";
import WorkflowAgentAdapter from "src/workflow/adapter/output/WorkflowAgentAdapter";
import { ConfigService } from "@nestjs/config";
import AgentRepository from "src/workflow/adapter/output/AgentRepository";
import Token from "src/accountConnection/domain/Token";

describe("WorkflowAgentAdapter", () => {
    let workflowAgentAdapter: WorkflowAgentAdapter;
    let agentRepositoryMock: { executeRequest: jest.Mock };
    let configService: { get: jest.Mock };
    const googleTokenMock = new Token("token", "refreshToken", new Date());
    const workflowMock = new Workflow("prova", [
        new Node(NodeType.GCalendar, "action1", new Point(1, 1)),
        new Node(NodeType.Gmail, "action2", new Point(2, 2)),
        new Node(NodeType.Pastebin, "", new Point(3, 3))
    ]);

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                { provide: AgentRepository, useValue: agentRepositoryMock },
                { provide: ConfigService, useValue: configService },
                WorkflowAgentAdapter
            ]
        }).compile();
        workflowAgentAdapter = module.get<WorkflowAgentAdapter>(WorkflowAgentAdapter);
    };

    beforeEach(async () => {
        agentRepositoryMock = { executeRequest: jest.fn() };
        configService = { get: jest.fn() };
        await createTestingModule();
    });

    describe("executeWorkflow", () => {
        it("TUB83 - should execute the workflow", async () => {
            agentRepositoryMock.executeRequest.mockResolvedValue("result");
            expect(await workflowAgentAdapter.executeWorkflow(workflowMock, googleTokenMock)).toEqual("result");
        });
    });
});

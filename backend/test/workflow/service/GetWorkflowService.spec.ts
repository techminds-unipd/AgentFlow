import { Test, TestingModule } from "@nestjs/testing";
import { WorkflowNotFoundError } from "src/BusinessErrors";
import GetWorkflowCommand from "src/workflow/domain/GetWorkflowCommand";
import { Node, NodeType, Point, Workflow } from "src/workflow/domain/Workflow";
import { GetWorkflowService } from "src/workflow/service/GetWorkflowService";
import { GET_WORKFLOW_PORT } from "src/workflow/service/port/output/GetWorkflowPort";;

describe("GetWorkflowService", () => {
    let getWorkflowService: GetWorkflowService;
    let getWorkflowPortMock: { getWorkflowByName: jest.Mock };
    let getWorkflowCommandMock = new GetWorkflowCommand("username", "prova");
    const workflowMock = new Workflow("prova", [
        new Node(NodeType.GCalendar, "action1", new Point(1, 1)),
        new Node(NodeType.Gmail, "action2", new Point(2, 2)),
        new Node(NodeType.Pastebin, "", new Point(3, 3))
    ]);

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GetWorkflowService, { provide: GET_WORKFLOW_PORT, useValue: getWorkflowPortMock }]
        }).compile();
        getWorkflowService = module.get<GetWorkflowService>(GetWorkflowService);
    };

    beforeEach(async () => {
        getWorkflowPortMock = { getWorkflowByName: jest.fn() };
        await createTestingModule();
    });

    describe("getWorkflow", () => {
        it("TUB43 - should get the workflow by its name", async () => {
            getWorkflowPortMock.getWorkflowByName.mockResolvedValue(workflowMock);
            expect(await getWorkflowService.getWorkflow(getWorkflowCommandMock)).toEqual(workflowMock);
        });

        it("TUB44 - shouldn't find the workflow in the database", async () => {
            getWorkflowPortMock.getWorkflowByName.mockResolvedValue(null);
            expect(getWorkflowService.getWorkflow(getWorkflowCommandMock)).rejects.toThrow(WorkflowNotFoundError);
        });

    });
});
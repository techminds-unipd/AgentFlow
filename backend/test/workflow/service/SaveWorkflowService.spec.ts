import { Test, TestingModule } from "@nestjs/testing";
import { WorkflowNotFoundError } from "src/BusinessErrors";
import SaveWorkflowCommand from "src/workflow/domain/SaveWorkflowCommand";
import { Node, NodeType, Point, Workflow } from "src/workflow/domain/Workflow";
import { SAVE_WORKFLOW_PORT } from "src/workflow/service/port/output/SaveWorkflowPort";
import { SaveWorkflowService } from "src/workflow/service/SaveWorkflowService";

describe("SaveWorkflowService", () => {
    let saveWorkflowService: SaveWorkflowService;
    let saveWorkflowPortMock: { saveWorkflow: jest.Mock };
    const workflowMock = new Workflow("prova", [
        new Node(NodeType.GCalendar, "action1", new Point(1, 1)),
        new Node(NodeType.Gmail, "action2", new Point(2, 2)),
        new Node(NodeType.Pastebin, "", new Point(3, 3))
    ]);
    let saveWorkflowCommandMock = new SaveWorkflowCommand("username", workflowMock);

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SaveWorkflowService, { provide: SAVE_WORKFLOW_PORT, useValue: saveWorkflowPortMock }]
        }).compile();
        saveWorkflowService = module.get<SaveWorkflowService>(SaveWorkflowService);
    };

    beforeEach(async () => {
        saveWorkflowPortMock = { saveWorkflow: jest.fn() };
        await createTestingModule();
    });

    describe("saveWorkflow", () => {
        it("should return the saved workflow", async () => {
            saveWorkflowPortMock.saveWorkflow.mockResolvedValue(workflowMock);
            expect(await saveWorkflowService.saveWorkflow(saveWorkflowCommandMock)).toEqual(workflowMock);
        });

        it("shouldn't find the workflow in the database", async () => {
            saveWorkflowPortMock.saveWorkflow.mockResolvedValue(null);
            expect(saveWorkflowService.saveWorkflow(saveWorkflowCommandMock)).rejects.toThrow(WorkflowNotFoundError);
        });
    });
});
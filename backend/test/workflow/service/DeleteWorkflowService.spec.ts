import { Test, TestingModule } from "@nestjs/testing";
import { WorkflowNotFoundError } from "src/BusinessErrors";
import DeleteWorkflowCommand from "src/workflow/domain/DeleteWorkflowCommand";
import { Workflow } from "src/workflow/domain/Workflow";
import { DeleteWorkflowService } from "src/workflow/service/DeleteWorkflowService";
import { DELETE_WORKFLOW_PORT } from "src/workflow/service/port/output/DeleteWorkflowPort";

describe("GetWorkflowService", () => {
    let deleteWorkflowService: DeleteWorkflowService;
    let deleteWorkflowPortMock: { deleteWorkflow: jest.Mock };
    let deleteWorkflowCommandMock = new DeleteWorkflowCommand("username", "prova");
    const workflowMock = new Workflow("prova", []);

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DeleteWorkflowService, { provide: DELETE_WORKFLOW_PORT, useValue: deleteWorkflowPortMock }]
        }).compile();
        deleteWorkflowService = module.get<DeleteWorkflowService>(DeleteWorkflowService);
    };

    beforeEach(async () => {
        deleteWorkflowPortMock = { deleteWorkflow: jest.fn() };
        await createTestingModule();
    });

    describe("deleteWorkflow", () => {
        it("TUB38 - should delete the workflow by its name", async () => {
            deleteWorkflowPortMock.deleteWorkflow.mockResolvedValue(workflowMock);
            expect(await deleteWorkflowService.deleteWorkflow(deleteWorkflowCommandMock)).toEqual(workflowMock);
        });

        it("TUB39 - shouldn't find the workflow in the database", async () => {
            deleteWorkflowPortMock.deleteWorkflow.mockResolvedValue(null);
            expect(deleteWorkflowService.deleteWorkflow(deleteWorkflowCommandMock)).rejects.toThrow(WorkflowNotFoundError);
        });
    });
});

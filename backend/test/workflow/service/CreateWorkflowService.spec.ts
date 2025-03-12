import { Test, TestingModule } from "@nestjs/testing";
import { WorkflowAlreadyExistsError, WorkflowNotAddedError, WorkflowNotFoundError } from "src/BusinessErrors";
import CreateWorkflowCommand from "src/workflow/domain/CreateWorkflowCommand";
import { Workflow } from "src/workflow/domain/Workflow";
import CreateWorkflowService from "src/workflow/service/CreateWorkflowService";
import { CREATE_WORKFLOW_PORT } from "src/workflow/service/port/output/CreateWorkflowPort";
import { GET_WORKFLOW_PORT } from "src/workflow/service/port/output/GetWorkflowPort";

describe("GetWorkflowService", () => {
    let createWorkflowService: CreateWorkflowService;
    let getWorkflowPortMock: { getWorkflowByName: jest.Mock };
    let createWorkflowPortMock: { addWorkflow: jest.Mock };
    const createWorkflowCommandMock = new CreateWorkflowCommand("prova", "username");
    const workflowMock = new Workflow("prova", []);

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateWorkflowService, 
                { provide: GET_WORKFLOW_PORT, useValue: getWorkflowPortMock },
                { provide: CREATE_WORKFLOW_PORT, useValue: createWorkflowPortMock }
            ]
        }).compile();
        createWorkflowService = module.get<CreateWorkflowService>(CreateWorkflowService);
    };

    beforeEach(async () => {
        createWorkflowPortMock = { addWorkflow: jest.fn() };
        getWorkflowPortMock = { getWorkflowByName: jest.fn() };
        await createTestingModule();
    });

    describe("createWorkflow", () => {
        it("should create the workflow", async () => {
            getWorkflowPortMock.getWorkflowByName.mockResolvedValue(null);
            createWorkflowPortMock.addWorkflow.mockResolvedValue(workflowMock);
            expect(await createWorkflowService.createWorkflow(createWorkflowCommandMock)).toEqual(workflowMock);
        });

        it("shouldn't create the workflow because has the same name as an existing one", async () => {
            getWorkflowPortMock.getWorkflowByName.mockResolvedValue(workflowMock);
            expect(createWorkflowService.createWorkflow(createWorkflowCommandMock)).rejects.toThrow(WorkflowAlreadyExistsError);
        });

        it("shouldn't create the workflow because it wasn't added to the user", async () => {
            getWorkflowPortMock.getWorkflowByName.mockResolvedValue(null);
            createWorkflowPortMock.addWorkflow.mockResolvedValue(null);
            expect(createWorkflowService.createWorkflow(createWorkflowCommandMock)).rejects.toThrow(WorkflowNotAddedError);
        });
    });
});
import { Test, TestingModule } from "@nestjs/testing";
import { NodeEntity, WorkflowEntity } from "src/workflow/adapter/output/WorkflowEntity";
import WorkflowPortAdapter from "src/workflow/adapter/output/WorkflowPortAdapter";
import { WorkflowRepository } from "src/workflow/adapter/output/WorkflowRepository";
import { Node, NodeType, Point, Workflow } from "src/workflow/domain/Workflow";

describe("WorkflowPortAdapter", () => {
    let workflowPortAdapter: WorkflowPortAdapter;
    let workflowRepositoryMock: { 
        getWorkflowByName: jest.Mock,
        addWorkflow: jest.Mock,
        getAllWorkflowByUsername: jest.Mock,
        deleteWorkflow: jest.Mock
    };
    const workflowMock = new Workflow("prova", [
        new Node(NodeType.GCalendar, "action1", new Point(1, 1)),
        new Node(NodeType.Gmail, "action2", new Point(2, 2)),
        new Node(NodeType.Pastebin, "", new Point(3, 3))
    ]);
    const workflowEntityMock = new WorkflowEntity("prova", [
        new NodeEntity("GCALENDAR", "action1", 1, 1),
        new NodeEntity("GMAIL", "action2", 2, 2),
        new NodeEntity("PASTEBIN", "", 3, 3)
    ]);
    const workflowEmptyMock = new Workflow("prova", []);
    const workflowEntityEmptyMock = new WorkflowEntity("prova", []);
    const workflowEntityListMock = [
        workflowEntityMock,
        new WorkflowEntity("prova2", []),
        new WorkflowEntity("prova3", [])
    ];
    const workflowListMock = [
        workflowMock,
        new Workflow("prova2", []),
        new Workflow("prova3", [])
    ];
    
    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WorkflowPortAdapter, 
                { provide: WorkflowRepository, useValue: workflowRepositoryMock }
            ]
        }).compile();
        workflowPortAdapter = module.get<WorkflowPortAdapter>(WorkflowPortAdapter);
    };

    beforeEach(async () => {
        workflowRepositoryMock = { 
            getWorkflowByName: jest.fn(),
            addWorkflow: jest.fn(),
            getAllWorkflowByUsername: jest.fn(),
            deleteWorkflow: jest.fn()
        };
        await createTestingModule();
    });

    describe("getWorkflowByName", () => {
        it("should return the workflow of the user", async () => {
            workflowRepositoryMock.getWorkflowByName.mockResolvedValue(workflowEntityMock);
            expect(await workflowPortAdapter.getWorkflowByName("username", "prova")).toEqual(workflowMock);
        });

        it("should return null if the workflow doesn't exists", async () => {
            workflowRepositoryMock.getWorkflowByName.mockResolvedValue(null);
            expect(await workflowPortAdapter.getWorkflowByName("username", "prova")).toEqual(null);
        });
    });

    describe("addWorkflow", () => {
        it("should add the workflow to the user", async () => {
            workflowRepositoryMock.addWorkflow.mockResolvedValue(workflowEntityEmptyMock);
            expect(await workflowPortAdapter.addWorkflow("prova", workflowEmptyMock)).toEqual(workflowEmptyMock);
        });

        it("should return null if the workflow wasn't added", async () => {
            workflowRepositoryMock.addWorkflow.mockResolvedValue(null);
            expect(await workflowPortAdapter.addWorkflow("prova", workflowEmptyMock)).toEqual(null);
        });
    })

    describe("deleteWorkflow", () => {
        it("should return the workflow of the user", async () => {
            workflowRepositoryMock.deleteWorkflow.mockResolvedValue(workflowEntityMock);
            expect(await workflowPortAdapter.deleteWorkflow("username", "prova")).toEqual(workflowMock);
        });

        it("should return null if the workflow doesn't exists", async () => {
            workflowRepositoryMock.deleteWorkflow.mockResolvedValue(null);
            expect(await workflowPortAdapter.deleteWorkflow("username", "prova")).toEqual(null);
        });
    });

    describe("getAllWorkflowByUsername", () => {
        it("should return all the workflows of the user", async () => {
            workflowRepositoryMock.getAllWorkflowByUsername.mockResolvedValue(workflowEntityListMock);
            expect(await workflowPortAdapter.getAllWorkflowByUsername("username")).toEqual(workflowListMock);
        });

        it("should return null if the user doesn't exist", async () => {
            workflowRepositoryMock.getAllWorkflowByUsername.mockResolvedValue(null);
            expect(await workflowPortAdapter.getAllWorkflowByUsername("username")).toEqual(null);
        });
    });
});

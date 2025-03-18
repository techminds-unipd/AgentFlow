import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { UserEntity } from "src/user/adapter/output/UserEntity";
import { NodeEntity, WorkflowEntity } from "src/workflow/adapter/output/WorkflowEntity";
import { WorkflowRepository } from "src/workflow/adapter/output/WorkflowRepository";

describe("WorkflowRepository", () => {
    let workflowRepository: WorkflowRepository;
    let userEntityModelMock: { findOne: jest.Mock; create: jest.Mock; exec: jest.Mock, findOneAndUpdate: jest.Mock };
    const workflowEntityMock = new WorkflowEntity("prova", [
        new NodeEntity("GCALENDAR", "action1", 1, 1),
        new NodeEntity("GMAIL", "action2", 2, 2),
        new NodeEntity("PASTEBIN", "", 3, 3),
    ]);
    const userEntityMock = { workflows: [
        workflowEntityMock
    ] };
    const workflowEntityEmptyMock = new WorkflowEntity("prova1", []);
    const userEntityEmptyMock = { workflows: [
        workflowEntityEmptyMock
    ] };
    const userEntityEmptyWorkflowMock = { workflows: [] };
    const workflowEntityListMock = [
        workflowEntityMock,
        workflowEntityEmptyMock,
        new WorkflowEntity("prova2", [])
    ];
    const UserEntityWithWorkflowListMock = { workflows: workflowEntityListMock };

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WorkflowRepository, 
                { provide: getModelToken(UserEntity.name), useValue: userEntityModelMock }
            ]
        }).compile();
        workflowRepository = module.get<WorkflowRepository>(WorkflowRepository);
    };

    beforeEach(async () => {
        userEntityModelMock = { findOne: jest.fn(), create: jest.fn(), exec: jest.fn(), findOneAndUpdate: jest.fn()};
        await createTestingModule();
    });

    describe("getWorkflowByName", () => {
        it("should return a workflow", async () => {
            userEntityModelMock.findOne.mockReturnThis();
            userEntityModelMock.exec.mockResolvedValue(userEntityMock);
            expect(await workflowRepository.getWorkflowByName("username", "prova")).toEqual(workflowEntityMock);
        });
        it("should return null if the workflow doesn't exists", async () => {
            userEntityModelMock.findOne.mockReturnThis();
            userEntityModelMock.exec.mockResolvedValue(null);
            expect(await workflowRepository.getWorkflowByName("username", "prova")).toEqual(null);
        });
    });

    describe("addWorkflow", () => {
        it("should add a workflow", async () => {
            userEntityModelMock.findOneAndUpdate.mockReturnThis();
            userEntityModelMock.exec.mockResolvedValue(userEntityEmptyMock);
            expect(await workflowRepository.addWorkflow("username", workflowEntityEmptyMock)).toEqual(workflowEntityEmptyMock);
        });

        it("should return null if it didn't find the user", async () => {
            userEntityModelMock.findOneAndUpdate.mockReturnThis();
            userEntityModelMock.exec.mockResolvedValue(null);
            expect(await workflowRepository.addWorkflow("username", workflowEntityEmptyMock)).toEqual(null);
        });

        it("should return null if the workflow wasn't added", async () => {
            userEntityModelMock.findOneAndUpdate.mockReturnThis();
            userEntityModelMock.exec.mockResolvedValue(userEntityEmptyWorkflowMock);
            expect(await workflowRepository.addWorkflow("username", workflowEntityEmptyMock)).toEqual(null);
        });
    });

    describe("getAllWorkflowByUsername", () => {
        it("should return all the workflows of the user", async () => {
            userEntityModelMock.findOne.mockReturnThis();
            userEntityModelMock.exec.mockResolvedValue(UserEntityWithWorkflowListMock);
            expect(await workflowRepository.getAllWorkflowByUsername("username")).toEqual(workflowEntityListMock);
        });

        it("should return null if the user doesn't exists", async () => {
            userEntityModelMock.findOne.mockReturnThis();
            userEntityModelMock.exec.mockResolvedValue(null);
            expect(await workflowRepository.getAllWorkflowByUsername("username")).toEqual(null);
        });
    });

    describe("deleteWorkflow", () => {
        it("should return a workflow", async () => {
            workflowRepository.getWorkflowByName = jest.fn();
            (workflowRepository.getWorkflowByName as jest.Mock).mockResolvedValue(workflowEntityMock);
            userEntityModelMock.findOneAndUpdate.mockReturnThis();
            userEntityModelMock.exec.mockResolvedValue(userEntityEmptyWorkflowMock);
            expect(await workflowRepository.deleteWorkflow("username", "prova")).toEqual(workflowEntityMock);
        });

        it("should return null if the workflow doesn't exists", async () => {
            workflowRepository.getWorkflowByName = jest.fn();
            (workflowRepository.getWorkflowByName as jest.Mock).mockResolvedValue(null);
            expect(await workflowRepository.deleteWorkflow("username", "prova")).toEqual(null);
        });

        it("should return null if it didn't delete the workflow", async () => {
            workflowRepository.getWorkflowByName = jest.fn();
            (workflowRepository.getWorkflowByName as jest.Mock).mockResolvedValue(workflowEntityMock);
            userEntityModelMock.findOneAndUpdate.mockReturnThis();
            userEntityModelMock.exec.mockResolvedValue(userEntityMock);
            expect(await workflowRepository.deleteWorkflow("username", "prova")).toEqual(null);
        });
    });

    describe("saveWorkflow", () => {
        it("should return a workflow", async () => {
            userEntityModelMock.findOneAndUpdate.mockReturnThis();
            userEntityModelMock.exec.mockResolvedValue(UserEntityWithWorkflowListMock);
            expect(await workflowRepository.saveWorkflow("username", workflowEntityMock)).toEqual(workflowEntityMock);
        });
        
        it("should return null if the workflow doesn't exists", async () => {
            userEntityModelMock.findOneAndUpdate.mockReturnThis();
            userEntityModelMock.exec.mockResolvedValue(null);
            expect(await workflowRepository.saveWorkflow("username", workflowEntityMock)).toEqual(null);
        });    
    });
});


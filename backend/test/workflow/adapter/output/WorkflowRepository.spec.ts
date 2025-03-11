import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { UserEntity } from "src/user/adapter/output/UserEntity";
import { NodeEntity, WorkflowEntity } from "src/workflow/adapter/output/WorkflowEntity";
import { WorkflowRepository } from "src/workflow/adapter/output/WorkflowRepository";

describe("WorkflowRepository", () => {
    let workflowRepository: WorkflowRepository;
    let userEntityModelMock: { findOne: jest.Mock; create: jest.Mock; exec: jest.Mock };
    const userEntityMock = { workflows: [
        { name: "prova", nodes: [
            { type: "GCALENDAR", action: "action1", positionX: 1, positionY: 1 },
            { type: "GMAIL", action: "action2", positionX: 2, positionY: 2 },
            { type: "PASTEBIN", action: "action3", positionX: 3, positionY: 3 },
        ] },
    ] };
    const WorkflowEntityMock = new WorkflowEntity("prova", [
        new NodeEntity("GCALENDAR", "action1", 1, 1),
        new NodeEntity("GMAIL", "action2", 2, 2),
        new NodeEntity("PASTEBIN", "action3", 3, 3),
    ])
    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WorkflowRepository, { provide: getModelToken(UserEntity.name), useValue: userEntityModelMock }]
        }).compile();
        workflowRepository = module.get<WorkflowRepository>(WorkflowRepository);
    };

    beforeEach(async () => {
        userEntityModelMock = { findOne: jest.fn(), create: jest.fn(), exec: jest.fn() };
        await createTestingModule();
    });

    describe("getWorkflowByName", () => {
        it("should return a workflow", async () => {
            userEntityModelMock.findOne.mockReturnThis();
            userEntityModelMock.exec.mockResolvedValue(userEntityMock);
            expect(await workflowRepository.getWorkflowByName("username", "prova")).toEqual(WorkflowEntityMock);
        });
    });

});

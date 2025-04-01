import { Test, TestingModule } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { MongooseError } from "mongoose";
import { HttpException, HttpStatus } from "@nestjs/common";
import { UserNotFoundError } from "src/BusinessErrors";
import WorkflowNameListController from "src/workflow/adapter/input/WorkflowNameListController";
import { WORKFLOW_NAME_LIST_USE_CASE } from "src/workflow/service/port/input/WorkflowNameListUseCase";

describe("WorkflowNameListController", () => {
    let workflowNameListController: WorkflowNameListController;
    let workflowNameListUseCaseMock: { getWorkflowNameList: jest.Mock };
    let jwtService: { verifyAsync: jest.Mock };
    const workflowNameListMock = ["prova", "prova2", "prova3"];

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [WorkflowNameListController],
            providers: [
                { provide: WORKFLOW_NAME_LIST_USE_CASE, useValue: workflowNameListUseCaseMock },
                { provide: JwtService, useValue: jwtService }
            ]
        }).compile();
        workflowNameListController = module.get<WorkflowNameListController>(WorkflowNameListController);
    };

    beforeEach(async () => {
        workflowNameListUseCaseMock = { getWorkflowNameList: jest.fn() };
        jwtService = { verifyAsync: jest.fn() };
        await createTestingModule();
    });

    describe("getWorkflowNameList", () => {
        it("TUB51 - should get all the workflow names of the user", async () => {
            workflowNameListUseCaseMock.getWorkflowNameList.mockResolvedValue(workflowNameListMock);
            expect(await workflowNameListController.getWorkflowNameList({ username: "username" })).toEqual(workflowNameListMock);
        });
        
        it("TUB52 - should throw HttpException because the database throws an exception", async () => {
            workflowNameListUseCaseMock.getWorkflowNameList.mockImplementation(() => {
                throw new MongooseError("");
            });
            const result = workflowNameListController.getWorkflowNameList({ username: "username" });
            expect(result).rejects.toThrow(HttpException);
            expect(result).rejects.toHaveProperty("status", HttpStatus.INTERNAL_SERVER_ERROR);
        });

        it("TUB53 - should throw HttpException because the user was not found so neither the workflows", async () => {
            workflowNameListUseCaseMock.getWorkflowNameList.mockImplementation(() => {
                throw new UserNotFoundError;
            });
            const result = workflowNameListController.getWorkflowNameList({ username: "username" });
            expect(result).rejects.toThrow(HttpException);
            expect(result).rejects.toHaveProperty("status", HttpStatus.BAD_REQUEST);
        });
        
    });
});

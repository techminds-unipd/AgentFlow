import { Controller, Get, HttpException, HttpStatus, Inject, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./AuthGuard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { WORKFLOW_NAME_LIST_USE_CASE, WorkflowNameListUseCase } from "src/workflow/service/port/input/WorkflowNameListUseCase";
import { RequestHeader } from "./WorkflowDTO";
import { UserNotFoundError } from "src/BusinessErrors";

@ApiBearerAuth()
@Controller("workflow")
class WorkflowNameListController {
    constructor(@Inject(WORKFLOW_NAME_LIST_USE_CASE) private readonly workflowNameListUseCase: WorkflowNameListUseCase) {}

    @UseGuards(AuthGuard)
    @Get("/all")
    async getWorkflowNameList(@Request() request: RequestHeader): Promise<string[]> {
        try {
            const username = request.username;
            const workflowNameList = await this.workflowNameListUseCase.getWorkflowNameList(username);
            return workflowNameList;
        } catch (error) {
            if (error instanceof UserNotFoundError) throw new HttpException("User not found", HttpStatus.BAD_REQUEST);

            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export default WorkflowNameListController;

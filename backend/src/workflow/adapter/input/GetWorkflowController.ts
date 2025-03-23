import { Controller, Get, HttpException, HttpStatus, Inject, Param, Request, UseGuards } from "@nestjs/common";
import { WorkflowNotFoundError } from "src/BusinessErrors";
import { GET_WORKFLOW_USE_CASE, GetWorkflowUseCase } from "src/workflow/service/port/input/GetWorkflowUseCase";
import { RequestHeader, WorkflowDTO } from "./WorkflowDTO";
import GetWorkflowCommand from "src/workflow/domain/GetWorkflowCommand";
import { AuthGuard } from "./AuthGuard";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import WorkflowAdapterImplementation from "./WorkflowAdapterImplementation";

@ApiBearerAuth()
@Controller("workflow")
class GetWorkflowController {
    constructor(
        @Inject(GET_WORKFLOW_USE_CASE)
        private readonly getWorkflowUseCase: GetWorkflowUseCase,
        private readonly workflowAdapterImplementation: WorkflowAdapterImplementation
    ) {}

    @UseGuards(AuthGuard)
    @Get("/get/:name")
    @ApiResponse({ status: 200, description: "Workflow retrieved successfully" })
    @ApiResponse({ status: 404, description: "Workflow not found" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async getWorkflow(@Param("name") workflowName: string, @Request() request: RequestHeader): Promise<WorkflowDTO> {
        try {
            const username = request.username;
            const workflow = await this.getWorkflowUseCase.getWorkflow(new GetWorkflowCommand(username, workflowName));
            return this.workflowAdapterImplementation.toDTO(workflow);
        } catch (error) {
            if (error instanceof WorkflowNotFoundError) throw new HttpException("Workflow not found", HttpStatus.NOT_FOUND);

            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export default GetWorkflowController;

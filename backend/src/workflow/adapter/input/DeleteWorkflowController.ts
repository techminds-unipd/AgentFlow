import { Controller, Delete, HttpException, HttpStatus, Inject, Param, Request, UseGuards } from "@nestjs/common";
import { RequestHeader, WorkflowDTO } from "./WorkflowDTO";
import { AuthGuard } from "./AuthGuard";
import { DeleteWorkflowUseCase, DELETE_WORKFLOW_USE_CASE } from "src/workflow/service/port/input/DeleteWorkflowUseCase";
import DeleteWorkflowCommand from "src/workflow/domain/DeleteWorkflowCommand";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { WorkflowNotFoundError } from "src/BusinessErrors";
import WorkflowAdapterImplementation from "./WorkflowAdapterImplementation";

@ApiBearerAuth()
@Controller("workflow")
class DeleteWorkflowController {
    constructor(
        @Inject(DELETE_WORKFLOW_USE_CASE)
        private readonly deletetWorkflowUseCase: DeleteWorkflowUseCase,
        private readonly workflowAdapterImplementation: WorkflowAdapterImplementation
    ) {}

    @UseGuards(AuthGuard)
    @Delete("/delete/:name")
    @ApiResponse({ status: 200, description: "Workflow deleted successfully" })
    @ApiResponse({ status: 404, description: "Workflow not found" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async deleteWorkflow(@Param("name") workflowName: string, @Request() request: RequestHeader): Promise<WorkflowDTO> {
        try {
            const username = request.username;
            const workflow = await this.deletetWorkflowUseCase.deleteWorkflow(new DeleteWorkflowCommand(username, workflowName));
            return this.workflowAdapterImplementation.toDTO(workflow);
        } catch (error) {
            if (error instanceof WorkflowNotFoundError) throw new HttpException("Workflow not found", HttpStatus.NOT_FOUND);
            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export default DeleteWorkflowController;

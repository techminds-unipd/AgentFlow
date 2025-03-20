import { Body, Controller, HttpException, HttpStatus, Inject, Put, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { Node, NodeType, Point, Workflow } from "src/workflow/domain/Workflow";
import { SAVE_WORKFLOW_USE_CASE, SaveWorkflowUseCase } from "src/workflow/service/port/input/SaveWorkflowUseCase";
import { EdgeDTO, NodeDataDTO, NodeDTO, PositionDTO, RequestHeader, WorkflowDTO } from "./WorkflowDTO";
import { AuthGuard } from "./AuthGuard";
import { WorkflowNotFoundError } from "src/BusinessErrors";
import SaveWorkflowCommand from "src/workflow/domain/SaveWorkflowCommand";
import { isNotIn } from "class-validator";
import WorkflowDTOValidator from "./WorkflowDTOValidator";
import WorkflowAdapterImplementation from "./WorkflowAdapterImplementation";

@ApiBearerAuth()
@Controller("workflow")
class SaveWorkflowController {
    constructor(
        @Inject(SAVE_WORKFLOW_USE_CASE)
        private readonly saveWorkflowUseCase: SaveWorkflowUseCase,
        private readonly workflowDTOValidator: WorkflowDTOValidator,
        private readonly workflowAdapterImplementation: WorkflowAdapterImplementation
    ) {}

    @UseGuards(AuthGuard)
    @Put("/save")
    @ApiResponse({ status: 200, description: "Workflow saved successfully" })
    @ApiResponse({ status: 404, description: "Workflow not found" })
    @ApiResponse({ status: 412, description: "Invalid workflow" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async saveWorkflow(@Body() workflow: WorkflowDTO, @Request() request: RequestHeader): Promise<WorkflowDTO> {
        this.workflowDTOValidator.validate(workflow);
        try {
            const username = request.username;
            const savedWorkflow = await this.saveWorkflowUseCase.saveWorkflow(
                new SaveWorkflowCommand(username, this.workflowAdapterImplementation.toDomain(workflow))
            );
            return this.workflowAdapterImplementation.toDTO(savedWorkflow);
        } catch (error) {
            if (error instanceof WorkflowNotFoundError) throw new HttpException("Workflow not found", HttpStatus.NOT_FOUND);

            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export default SaveWorkflowController;

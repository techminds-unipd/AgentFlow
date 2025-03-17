import { Controller, Delete, HttpException, HttpStatus, Inject, Param, Request, UseGuards } from "@nestjs/common";
import { EdgeDTO, NodeDataDTO, NodeDTO, PositionDTO, RequestHeader, WorkflowDTO } from "./WorkflowDTO";
import { AuthGuard } from "./AuthGuard";
import { Workflow } from "src/workflow/domain/Workflow";
import { DeleteWorkflowUseCase, DELETE_WORKFLOW_USE_CASE } from "src/workflow/service/port/input/DeleteWorkflowUseCase";
import DeleteWorkflowCommand from "src/workflow/domain/DeleteWorkflowCommand";
import { ApiBearerAuth } from "@nestjs/swagger";
import { WorkflowNotFoundError } from "src/BusinessErrors";

@ApiBearerAuth()
@Controller("workflow")
class DeleteWorkflowController {
    constructor(@Inject(DELETE_WORKFLOW_USE_CASE) private readonly deletetWorkflowUseCase: DeleteWorkflowUseCase) {}

    private toDTO(workflow: Workflow): WorkflowDTO {
        const nodes: NodeDTO[] = workflow.nodes.map(
            (node, index) => new NodeDTO(index, new PositionDTO(node.position.x, node.position.y), new NodeDataDTO(node.type))
        );
        const edges: EdgeDTO[] = [];

        for (let i = 0; i < workflow.nodes.length - 1; i++) edges.push(new EdgeDTO(workflow.nodes[i].action, i, i + 1));

        return new WorkflowDTO(workflow.name, nodes, edges);
    }

    @UseGuards(AuthGuard)
    @Delete("/delete/:name")
    async deleteWorkflow(@Param("name") workflowName: string, @Request() request: RequestHeader): Promise<WorkflowDTO> {
        try {
            const username = request.username;
            const workflow = await this.deletetWorkflowUseCase.deleteWorkflow(new DeleteWorkflowCommand(username, workflowName));
            return this.toDTO(workflow);
        } catch (error) {
            if (error instanceof WorkflowNotFoundError) throw new HttpException("Workflow not found", HttpStatus.NOT_FOUND);
            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export default DeleteWorkflowController;

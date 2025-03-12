import { Controller, Get, HttpException, HttpStatus, Inject, Param, Request, UseGuards } from "@nestjs/common";
import { WorkflowNotFoundError } from "src/BusinessErrors";
import { GET_WORKFLOW_USE_CASE, GetWorkflowUseCase } from "src/workflow/service/port/input/GetWorkflowUseCase";
import { EdgeDTO, NodeDataDTO, NodeDTO, PositionDTO, RequestHeader, WorkflowDTO } from "./WorkflowDTO";
import GetWorkflowCommand from "src/workflow/domain/GetWorkflowCommand";
import { AuthGuard } from "./AuthGuard";
import { Workflow } from "src/workflow/domain/Workflow";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller("workflow")
class GetWorkflowController {
    constructor(@Inject(GET_WORKFLOW_USE_CASE) private readonly getWorkflowUseCase: GetWorkflowUseCase) {}

    private toDTO(workflow: Workflow): WorkflowDTO {
        const nodes: NodeDTO[] = workflow.nodes.map(
            (node, index) =>
                new NodeDTO(index, new PositionDTO(node.position.x, node.position.y), new NodeDataDTO(node.type))
        );
        const edges: EdgeDTO[] = workflow.nodes
            .slice(0, workflow.nodes.length - 1)
            .map((node, index) => new EdgeDTO(node.action, index, index + 1));

        return new WorkflowDTO(workflow.name, nodes, edges);
    }

    @UseGuards(AuthGuard)
    @Get("/get/:name")
    async getWorkflow(@Param("name") workflowName: string, @Request() request: RequestHeader): Promise<WorkflowDTO> {
        try {
            const username = request.username;
            const workflow = await this.getWorkflowUseCase.getWorkflow(new GetWorkflowCommand(username, workflowName));
            return this.toDTO(workflow);
        } catch (error) {
            if (error instanceof WorkflowNotFoundError) throw new HttpException(error.message, HttpStatus.NOT_FOUND);

            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export default GetWorkflowController;

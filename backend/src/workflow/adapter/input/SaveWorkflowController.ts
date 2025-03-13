import { Body, Controller, HttpException, HttpStatus, Inject, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Node, NodeType, Point, Workflow } from "src/workflow/domain/Workflow";
import { SAVE_WORKFLOW_USE_CASE, SaveWorkflowUseCase } from "src/workflow/service/port/input/SaveWorkflowUseCase";
import { EdgeDTO, NodeDataDTO, NodeDTO, PositionDTO, RequestHeader, WorkflowDTO } from "./WorkflowDTO";
import { AuthGuard } from "./AuthGuard";
import { WorkflowNotFoundError } from "src/BusinessErrors";
import SaveWorkflowCommand from "src/workflow/domain/SaveWorkflowCommand";
import { isNotIn } from "class-validator";
import WorkflowDTOValidator from "./WorkflowDTOValidator";

@ApiBearerAuth()
@Controller("workflow")
class SaveWorkflowController {
    constructor(
        @Inject(SAVE_WORKFLOW_USE_CASE)
        private readonly saveWorkflowUseCase: SaveWorkflowUseCase,
        private readonly workflowDTOValidator: WorkflowDTOValidator
    ) {}

    private toDomain(workflowDto: WorkflowDTO): Workflow {
        const workflow: Workflow = new Workflow(workflowDto.name, []);
        let firstNode = undefined;
        const target = workflowDto.edges.map((edge) => edge.target);
        for (let i = 0; i < workflowDto.nodes.length && !firstNode; i++)
            if (isNotIn(workflowDto.nodes[i].id, target)) firstNode = workflowDto.nodes[i];
        let nextNode = firstNode;
        let edge = workflowDto.edges.find((edge) => edge.source === nextNode!.id);
        workflow.nodes.push(
            new Node(nextNode!.data.label as NodeType, edge!.label, new Point(nextNode!.position.x, nextNode!.position.y))
        );
        let action: string;
        for (let i = 0; i < workflowDto.nodes.length - 1; i++) {
            nextNode = workflowDto.nodes.find((node) => node.id === edge!.target);
            edge = workflowDto.edges.find((edge) => edge.source === nextNode!.id);
            if (edge) action = edge.label;
            else action = "";
            workflow.nodes.push(
                new Node(nextNode!.data.label as NodeType, action, new Point(nextNode!.position.x, nextNode!.position.y))
            );
        }
        return workflow;
    }

    private toDTO(workflow: Workflow): WorkflowDTO {
        const nodes: NodeDTO[] = workflow.nodes.map(
            (node, index) => new NodeDTO(index, new PositionDTO(node.position.x, node.position.y), new NodeDataDTO(node.type))
        );
        const edges: EdgeDTO[] = workflow.nodes
            .slice(0, workflow.nodes.length - 1)
            .map((node, index) => new EdgeDTO(node.action, index, index + 1));

        return new WorkflowDTO(workflow.name, nodes, edges);
    }

    @UseGuards(AuthGuard)
    @Post("/save")
    async saveWorkflow(@Body() workflow: WorkflowDTO, @Request() request: RequestHeader): Promise<WorkflowDTO> {
        this.workflowDTOValidator.validate(workflow);
        try {
            const username = request.username;
            const savedWorkflow = await this.saveWorkflowUseCase.saveWorkflow(
                new SaveWorkflowCommand(username, this.toDomain(workflow))
            );
            return this.toDTO(savedWorkflow);
        } catch (error) {
            if (error instanceof WorkflowNotFoundError) throw new HttpException("Workflow not found", HttpStatus.NOT_FOUND);

            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export default SaveWorkflowController;

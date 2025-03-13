import { Body, Controller, HttpException, HttpStatus, Inject, Post, PreconditionFailedException, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Node, NodeType, Point, Workflow } from "src/workflow/domain/Workflow";
import { SAVE_WORKFLOW_USE_CASE, SaveWorkflowUseCase } from "src/workflow/service/port/input/SaveWorkflowUseCase";
import { EdgeDTO, NodeDataDTO, NodeDTO, PositionDTO, RequestHeader, WorkflowDTO } from "./WorkflowDTO";
import { AuthGuard } from "./AuthGuard";
import { WorkflowNotFoundError } from "src/BusinessErrors";
import SaveWorkflowCommand from "src/workflow/domain/SaveWorkflowCommand";
import { isNotIn } from "class-validator";

@ApiBearerAuth()
@Controller("workflow")
class SaveWorkflowController {
    constructor(@Inject(SAVE_WORKFLOW_USE_CASE) private readonly saveWorkflowUseCase: SaveWorkflowUseCase) {}

    private checkWorkflow(workflow: WorkflowDTO): void {
        // non ci sono sufficienti nodi
        if (workflow.nodes.length < 2) throw new HttpException("Nodes must be at least 2", HttpStatus.PRECONDITION_FAILED);
        // non ci sono sufficienti archi
        if (workflow.edges.length !== workflow.nodes.length-1) throw new HttpException("Edges must be equal to nodes-1", HttpStatus.PRECONDITION_FAILED);

        const targets = workflow.edges.map(edge => edge.target);
        const sources = workflow.edges.map(edge => edge.source);
        const nodesId = workflow.nodes.map(node => node.id);

        // ci sono duplicati negli id dei nodi
        if(new Set(nodesId).size !== nodesId.length) throw new HttpException("Duplicate nodes id", HttpStatus.PRECONDITION_FAILED);
        // ci sono duplicati nelle source degli archi
        if(new Set(sources).size !== sources.length) throw new HttpException("Duplicate edge sources id", HttpStatus.PRECONDITION_FAILED);
        // ci sono duplicati nei target degli archi
        if(new Set(targets).size !== targets.length) throw new HttpException("Duplicate edge targets id", HttpStatus.PRECONDITION_FAILED);

        // un target oppure una source non è un nodeId (un arco non è collegato a un nodo), 
        // oppure ce un arco senza descrizione
        // oppure un arco collega un nodo a se stesso
        workflow.edges.forEach(edge => {
            if(edge.label === "") throw new HttpException("Edge must have a description", HttpStatus.PRECONDITION_FAILED);
            if(edge.source === edge.target) throw new HttpException("Edge source and target must be different", HttpStatus.PRECONDITION_FAILED);
            if(isNotIn(edge.source, nodesId)) throw new HttpException("Edge source must be a node id", HttpStatus.PRECONDITION_FAILED);
            if(isNotIn(edge.target, nodesId)) throw new HttpException("Edge target must be a node id", HttpStatus.PRECONDITION_FAILED);
        });
    }
    
    private toDomain(workflowDto: WorkflowDTO): Workflow {
        let workflow: Workflow = new Workflow(workflowDto.name, []);
        let firstNode = undefined;
        const target = workflowDto.edges.map(edge => edge.target);
        for (let i = 0; i < workflowDto.nodes.length && !firstNode; i++) {
            if(isNotIn(workflowDto.nodes[i].id, target))
                firstNode = workflowDto.nodes[i];
        }

        let nextNode = firstNode;
        let edge = workflowDto.edges.find(edge => edge.source === nextNode!.id);
        workflow.nodes.push(new Node(nextNode!.data.label as NodeType, edge!.label, new Point(nextNode!.position.x, nextNode!.position.y)));
        
        let action: string;
        for (let i = 0; i < workflowDto.nodes.length-1; i++) {
            nextNode = workflowDto.nodes.find(node => node.id === edge!.target);
            edge = workflowDto.edges.find(edge => edge.source === nextNode!.id);
            if (edge)
                action = edge.label;
            else
                action = "";
            workflow.nodes.push(new Node(nextNode!.data.label as NodeType, action, new Point(nextNode!.position.x, nextNode!.position.y)));
        }
        return workflow;
    }
    
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
    @Post("/save")
    async saveWorkflow(@Body() workflow: WorkflowDTO, @Request() request: RequestHeader): Promise<WorkflowDTO> {
        //throw new HttpException(this.checkWorkflow(workflow).toString(), HttpStatus.BAD_REQUEST);
        this.checkWorkflow(workflow);
        try {
            const username = request.username;
            const savedWorkflow = await this.saveWorkflowUseCase.saveWorkflow(new SaveWorkflowCommand(username, this.toDomain(workflow)));
            return this.toDTO(savedWorkflow);
        } catch (error) {
            if (error instanceof WorkflowNotFoundError) throw new HttpException("Workflow not found", HttpStatus.NOT_FOUND);

            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}

export default SaveWorkflowController;

import { Body, Controller, HttpException, HttpStatus, Inject, Post, Request, UseGuards } from "@nestjs/common";
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

    private checkWorkflow(workflow: WorkflowDTO): boolean {
        // non ci sono sufficienti nodi
        if (workflow.nodes.length >= 2) return false;
        // non ci sono sufficienti archi
        if (workflow.edges.length-1 !== workflow.nodes.length) return false;
        // ci sono archi senza label
        workflow.edges.forEach(edge => {
            if(edge.label === "") return false;
        });

        const targets = workflow.edges.map(edge => edge.target);
        const sources = workflow.edges.map(edge => edge.source);
        const nodesId = workflow.nodes.map(node => node.id);

        // ci sono duplicati negli id dei nodi
        if(new Set(nodesId).size !== nodesId.length) return false;
        // ci sono duplicati nelle source degli archi
        if(new Set(sources).size !== sources.length) return false;
        // ci sono duplicati nei target degli archi
        if(new Set(targets).size !== targets.length) return false;

        // un target oppure una source non è un nodeId (un arco non è collegato a un nodo)
        workflow.edges.forEach(edge => {
            if(isNotIn(edge.source, nodesId) || isNotIn(edge.target, nodesId)) return false;
        });

        // ci sono nodi isolati (FORSE NON SERVE PERCHE' CI SONO N-1 ARCHI COLLEGATI AI NODI) 
        nodesId.forEach(id => {
            if(isNotIn(id, sources) && isNotIn(id, targets)) return false;
        });

        /*
        // un target non è un nodeId
        target.forEach(t => {
            if(isNotIn(t, nodesId)) return false;
        });
        // un source non è un nodoId
        source.forEach(s => {
            if(isNotIn(s, nodesId)) return false;
        });
        */

        return true;
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
            //if (!nextNode) throw new Error("Invalid workflow");
            edge = workflowDto.edges.find(edge => edge.source === nextNode!.id);
            if (edge)
                action = edge.label;
            else
                action = "";
            workflow.nodes.push(new Node(nextNode!.data.label as NodeType, action, new Point(nextNode!.position.x, nextNode!.position.y)));
        }
        return workflow;

        //attenzione: bisogna decidere se validare il workflow anche prima di salvarlo altrimenti non si come fare le conversioni in oggetti di business
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
        //console.log(this.checkWorkflow(workflow));
        throw new HttpException(this.checkWorkflow(workflow).toString(), HttpStatus.BAD_REQUEST);
        /*if (!this.checkWorkflow(workflow)) throw new HttpException("Invalid workflow", HttpStatus.BAD_REQUEST);
        try {
            const username = request.username;
            const savedWorkflow = await this.saveWorkflowUseCase.saveWorkflow(new SaveWorkflowCommand(username, this.toDomain(workflow)));
            return this.toDTO(savedWorkflow);
        } catch (error) {
            if (error instanceof WorkflowNotFoundError) throw new HttpException(error.message, HttpStatus.NOT_FOUND);

            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }*/
        return workflow;
    }
    
}

export default SaveWorkflowController;

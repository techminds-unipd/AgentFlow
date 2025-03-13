import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { WorkflowDTO } from "./WorkflowDTO";
import { isNotIn } from "class-validator";

@Injectable()
export class WorkflowDTOValidator {
    public validate(workflow: WorkflowDTO): void {
        if (workflow.nodes.length < 2)
            throw new HttpException("Nodes must be at least 2", HttpStatus.PRECONDITION_FAILED);
        if (workflow.edges.length !== workflow.nodes.length - 1)
            throw new HttpException("Edges must be equal to nodes-1", HttpStatus.PRECONDITION_FAILED);
        const targets = workflow.edges.map((edge) => edge.target);
        const sources = workflow.edges.map((edge) => edge.source);
        const nodesId = workflow.nodes.map((node) => node.id);
        if (new Set(nodesId).size !== nodesId.length)
            throw new HttpException("Duplicate nodes id", HttpStatus.PRECONDITION_FAILED);
        if (new Set(sources).size !== sources.length)
            throw new HttpException("Duplicate edge sources id", HttpStatus.PRECONDITION_FAILED);
        if (new Set(targets).size !== targets.length)
            throw new HttpException("Duplicate edge targets id", HttpStatus.PRECONDITION_FAILED);
        workflow.edges.forEach((edge) => {
            if (edge.label === "")
                throw new HttpException("Edge must have a description", HttpStatus.PRECONDITION_FAILED);
            if (edge.source === edge.target)
                throw new HttpException("Edge source and target must be different", HttpStatus.PRECONDITION_FAILED);
            if (isNotIn(edge.source, nodesId))
                throw new HttpException("Edge source must be a node id", HttpStatus.PRECONDITION_FAILED);
            if (isNotIn(edge.target, nodesId))
                throw new HttpException("Edge target must be a node id", HttpStatus.PRECONDITION_FAILED);
        });
    }
}

//export const WORKFLOW_DTO_VALIDATOR = "WORKFLOW_DTO_VALIDATOR";

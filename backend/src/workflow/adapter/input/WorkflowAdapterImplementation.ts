import { Node, NodeType, Point, Workflow } from "src/workflow/domain/Workflow";
import { EdgeDTO, NodeDataDTO, NodeDTO, PositionDTO, WorkflowDTO } from "./WorkflowDTO";
import { isNotIn } from "class-validator";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class WorkflowAdapterImplementation {
    toDTO(workflow: Workflow): WorkflowDTO {
        const nodes: NodeDTO[] = workflow.nodes.map(
            (node, index) => new NodeDTO(index, new PositionDTO(node.position.x, node.position.y), new NodeDataDTO(node.type))
        );
        const edges: EdgeDTO[] = workflow.nodes
            .slice(0, workflow.nodes.length - 1)
            .map((node, index) => new EdgeDTO(node.action, index, index + 1));

        return new WorkflowDTO(workflow.name, nodes, edges);
    }

    /* eslint-disable max-statements */
    toDomain(workflowDto: WorkflowDTO): Workflow {
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
}

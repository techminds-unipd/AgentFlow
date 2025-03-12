import { Injectable } from "@nestjs/common";
import { Node, NodeType, Point, Workflow } from "src/workflow/domain/Workflow";
import { GetWorkflowPort } from "src/workflow/service/port/output/GetWorkflowPort";
import { WorkflowRepository } from "./WorkflowRepository";
import { CreateWorkflowPort } from "src/workflow/service/port/output/CreateWorkflowPort";
import { NodeEntity, WorkflowEntity } from "./WorkflowEntity";

@Injectable()
class WorkflowPortAdapter implements GetWorkflowPort, CreateWorkflowPort {
    constructor(private readonly workflowRepository: WorkflowRepository) {}

    private toDomain(workflowEntity: WorkflowEntity): Workflow {
        const nodes: Node[] = workflowEntity.nodes.map(
            (nodeEntity) =>
                new Node(
                    nodeEntity.type as NodeType,
                    nodeEntity.action,
                    new Point(nodeEntity.positionX, nodeEntity.positionY)
                )
        );
        return new Workflow(workflowEntity.name, nodes);
    }

    private toEntity(workflow: Workflow): WorkflowEntity {
        const nodesEntity: NodeEntity[] = workflow.nodes.map(
            (node) => new NodeEntity(node.type, node.action, node.position.x, node.position.y)
        );
        return new WorkflowEntity(workflow.name, nodesEntity);
    }

    async getWorkflowByName(username: string, workflowName: string): Promise<Workflow | null> {
        const workflowEntity = await this.workflowRepository.getWorkflowByName(username, workflowName);
        if (!workflowEntity) return null;
        return this.toDomain(workflowEntity);
    }

    async addWorkflow(username: string, workflow: Workflow): Promise<Workflow | null> {
        const addedWorkflow = await this.workflowRepository.addWorkflow(username, this.toEntity(workflow));
        if (!addedWorkflow) return null;
        return this.toDomain(addedWorkflow);
    }
}

export default WorkflowPortAdapter;

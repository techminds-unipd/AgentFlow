class NodeEntity {
    type: string;
    action: string;
    positionX: number;
    positionY: number;
}

class WorkflowEntity {
    name: string;
    nodes: NodeEntity[];
}


export default WorkflowEntity;
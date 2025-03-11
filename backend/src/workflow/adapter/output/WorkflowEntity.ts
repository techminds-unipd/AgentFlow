export class NodeEntity {
    readonly type: string;
    readonly action: string;
    readonly positionX: number;
    readonly positionY: number;

    constructor(type: string, action: string, positionX: number, positionY: number) {
        this.type = type;
        this.action = action;
        this.positionX = positionX;
        this.positionY = positionY;
    }
}

export class WorkflowEntity {
    readonly name: string;
    readonly nodes: NodeEntity[];

    constructor(name: string, nodes: NodeEntity[]) {
        this.name = name;
        this.nodes = nodes;
    }
}
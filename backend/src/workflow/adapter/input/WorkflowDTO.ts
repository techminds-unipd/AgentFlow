export class PositionDTO {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class NodeDataDTO {
    readonly label: string;

    constructor(label: string) {
        this.label = label;
    }
}

export class NodeDTO {
    readonly id: number;
    readonly position: PositionDTO;
    readonly data: NodeDataDTO;

    constructor(id: number, position: PositionDTO, data: NodeDataDTO) {
        this.id = id;
        this.position = position;
        this.data = data;
    }
}

export class EdgeDTO {
    readonly label: string;
    readonly source: number;
    readonly target: number;

    constructor(label: string, source: number, target: number) {
        this.label = label;
        this.source = source;
        this.target = target;
    }
}

export class WorkflowDTO {
    readonly name: string;
    readonly nodes: NodeDTO[];
    readonly edges: EdgeDTO[];

    constructor(name: string, nodes: NodeDTO[], edges: EdgeDTO[]) {
        this.name = name;
        this.nodes = nodes;
        this.edges = edges;
    }
}

export type RequestHeader = { username: string };
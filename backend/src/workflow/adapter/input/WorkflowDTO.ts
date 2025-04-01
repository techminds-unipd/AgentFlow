import { ApiProperty } from "@nestjs/swagger";

export class PositionDTO {
    @ApiProperty()
    readonly x: number;
    @ApiProperty()
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class NodeDataDTO {
    @ApiProperty()
    readonly label: string;

    constructor(label: string) {
        this.label = label;
    }
}

export class NodeDTO {
    @ApiProperty()
    readonly id: number;
    @ApiProperty({ type: PositionDTO })
    readonly position: PositionDTO;
    @ApiProperty({ type: NodeDataDTO })
    readonly data: NodeDataDTO;

    constructor(id: number, position: PositionDTO, data: NodeDataDTO) {
        this.id = id;
        this.position = position;
        this.data = data;
    }
}

export class EdgeDTO {
    @ApiProperty()
    readonly label: string;
    @ApiProperty()
    readonly source: number;
    @ApiProperty()
    readonly target: number;

    constructor(label: string, source: number, target: number) {
        this.label = label;
        this.source = source;
        this.target = target;
    }
}

export class WorkflowDTO {
    @ApiProperty()
    readonly name: string;
    @ApiProperty({ type: NodeDTO, isArray: true })
    readonly nodes: NodeDTO[];
    @ApiProperty({ type: EdgeDTO, isArray: true })
    readonly edges: EdgeDTO[];

    constructor(name: string, nodes: NodeDTO[], edges: EdgeDTO[]) {
        this.name = name;
        this.nodes = nodes;
        this.edges = edges;
    }
}

export type RequestHeader = { username: string };

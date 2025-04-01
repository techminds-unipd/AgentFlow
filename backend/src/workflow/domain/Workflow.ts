export enum NodeType {
    Gmail = "GMAIL",
    GCalendar = "GCALENDAR",
    Pastebin = "PASTEBIN"
}

export class Point {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Node {
    readonly type: NodeType;
    readonly action: string;
    readonly position: Point;

    constructor(type: NodeType, action: string, position: Point) {
        this.type = type;
        this.action = action;
        this.position = position;
    }
}

export class Workflow {
    readonly name: string;
    readonly nodes: Node[];

    constructor(name: string, nodes: Node[]) {
        this.name = name;
        this.nodes = nodes;
    }
}

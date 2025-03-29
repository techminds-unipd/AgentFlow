import { HttpException, HttpStatus } from "@nestjs/common";
import WorkflowAdapterImplementation from "src/workflow/adapter/input/WorkflowAdapterImplementation";
import { EdgeDTO, NodeDataDTO, NodeDTO, PositionDTO, WorkflowDTO } from "src/workflow/adapter/input/WorkflowDTO";
import { Node, NodeType, Point, Workflow } from "src/workflow/domain/Workflow";

describe("WorkflowAdapterImplementation", () => {
    const workflowAdapterImplementation = new WorkflowAdapterImplementation();
    const workflowMock = new Workflow("prova", [
            new Node(NodeType.GCalendar, "action1", new Point(1, 1)),
            new Node(NodeType.Gmail, "action2", new Point(2, 2)),
            new Node(NodeType.Pastebin, "", new Point(3, 3))
    ]);
    const workflowDTOMock = new WorkflowDTO("prova", [
        new NodeDTO(9, new PositionDTO(3, 3), new NodeDataDTO("PASTEBIN")),
        new NodeDTO(4, new PositionDTO(1, 1), new NodeDataDTO("GCALENDAR")),
        new NodeDTO(7, new PositionDTO(2, 2), new NodeDataDTO("GMAIL"))
    ], [
        new EdgeDTO("action2", 7, 9),
        new EdgeDTO("action1", 4, 7)
    ]);
    
    const workflowDTOOrderedMock = new WorkflowDTO("prova", [
        new NodeDTO(0, new PositionDTO(1, 1), new NodeDataDTO("GCALENDAR")),
        new NodeDTO(1, new PositionDTO(2, 2), new NodeDataDTO("GMAIL")),
        new NodeDTO(2, new PositionDTO(3, 3), new NodeDataDTO("PASTEBIN"))
    ], [
        new EdgeDTO("action1", 0, 1),
        new EdgeDTO("action2", 1, 2)
    ]);

    describe("toDTO", () => {
        it("TUB96 - should adapt Workflow to WorkflowDTO", () => {
            expect(workflowAdapterImplementation.toDTO(workflowMock)).toEqual(workflowDTOOrderedMock);
        });
    });

    describe("toDomain", () => {
        it("TUB97 - should adapt WorkflowDTO to Workflow", () => {
            expect(workflowAdapterImplementation.toDomain(workflowDTOMock)).toEqual(workflowMock);
        });
    });
});
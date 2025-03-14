import { HttpException, HttpStatus } from "@nestjs/common";
import { EdgeDTO, NodeDataDTO, NodeDTO, PositionDTO, WorkflowDTO } from "src/workflow/adapter/input/WorkflowDTO";
import WorkflowDTOValidator from "src/workflow/adapter/input/WorkflowDTOValidator";

describe("WorkflowDTOValidator", () => {
    describe("validate", () => {
        const workflowDTOValidator = new WorkflowDTOValidator();
        let workflowNodesDTOMock = [
            new NodeDTO(0, new PositionDTO(1, 1), new NodeDataDTO("GCALENDAR")),
            new NodeDTO(1, new PositionDTO(2, 2), new NodeDataDTO("GMAIL")),
            new NodeDTO(2, new PositionDTO(3, 3), new NodeDataDTO("PASTEBIN"))
        ];
        let workflowEdgesDTOMock = [
            new EdgeDTO("action1", 0, 1),
            new EdgeDTO("action2", 1, 2)
        ];
        let workflowDTOMock = new WorkflowDTO("prova", workflowNodesDTOMock, workflowEdgesDTOMock);

        it("should not throw an exception", () => {
            expect(() => workflowDTOValidator.validate(workflowDTOMock)).not.toThrow();
        });

        it("should throw an exception because the nodes must be at least 2", () => {
            workflowDTOMock = new WorkflowDTO("prova", [new NodeDTO(0, new PositionDTO(1, 1), new NodeDataDTO("GCALENDAR"))], []);
            expect(() => workflowDTOValidator.validate(workflowDTOMock)).toThrow(new HttpException("Nodes must be at least 2", HttpStatus.PRECONDITION_FAILED));
        });

        it("should throw an exception because the edges must be equal to nodes-1", () => {
            workflowDTOMock = new WorkflowDTO("prova", workflowNodesDTOMock, []);
            expect(() => workflowDTOValidator.validate(workflowDTOMock)).toThrow(new HttpException("Edges must be equal to nodes-1", HttpStatus.PRECONDITION_FAILED));
        });

        it("should throw an exception because of duplicate nodes id", () => {
            let workflowNodesDuplicateDTOMock = [
                new NodeDTO(0, new PositionDTO(1, 1), new NodeDataDTO("GCALENDAR")),
                new NodeDTO(0, new PositionDTO(2, 2), new NodeDataDTO("GMAIL")),
                new NodeDTO(2, new PositionDTO(3, 3), new NodeDataDTO("PASTEBIN"))
            ];
            workflowDTOMock = new WorkflowDTO("prova", workflowNodesDuplicateDTOMock, workflowEdgesDTOMock);
            expect(() => workflowDTOValidator.validate(workflowDTOMock)).toThrow(new HttpException("Duplicate nodes id", HttpStatus.PRECONDITION_FAILED));
        });

        it("should throw an exception because of duplicate edge sources id", () => {
            let workflowEdgesDuplicateDTOMock = [
                new EdgeDTO("action1", 0, 1),
                new EdgeDTO("action2", 0, 2)
            ];
            workflowDTOMock = new WorkflowDTO("prova", workflowNodesDTOMock, workflowEdgesDuplicateDTOMock);
            expect(() => workflowDTOValidator.validate(workflowDTOMock)).toThrow(new HttpException("Duplicate edge sources id", HttpStatus.PRECONDITION_FAILED));
        });

        it("should throw an exception because of duplicate edge targets id", () => {
            let workflowEdgesDuplicateDTOMock = [
                new EdgeDTO("action1", 0, 1),
                new EdgeDTO("action2", 1, 1)
            ];
            workflowDTOMock = new WorkflowDTO("prova", workflowNodesDTOMock, workflowEdgesDuplicateDTOMock);
            expect(() => workflowDTOValidator.validate(workflowDTOMock)).toThrow(new HttpException("Duplicate edge targets id", HttpStatus.PRECONDITION_FAILED));
        });

        it("should throw an exception because the edge must have a description", () => {
            let workflowEdgesDescriptionDTOMock = [
                new EdgeDTO("", 0, 1),
                new EdgeDTO("action2", 1, 2)
            ];
            workflowDTOMock = new WorkflowDTO("prova", workflowNodesDTOMock, workflowEdgesDescriptionDTOMock);
            expect(() => workflowDTOValidator.validate(workflowDTOMock)).toThrow(new HttpException("Edge must have a description", HttpStatus.PRECONDITION_FAILED));
        });

        it("should throw an exception because the edge source and target must be different", () => {
            let workflowEdgesSameSourceTargetDTOMock = [
                new EdgeDTO("action1", 0, 0),
                new EdgeDTO("action2", 1, 2)
            ];
            workflowDTOMock = new WorkflowDTO("prova", workflowNodesDTOMock, workflowEdgesSameSourceTargetDTOMock);
            expect(() => workflowDTOValidator.validate(workflowDTOMock)).toThrow(new HttpException("Edge source and target must be different", HttpStatus.PRECONDITION_FAILED));
        });

        it("should throw an exception because the edge source must be a node id", () => {
            let workflowEdgesWrongSourceDTOMock = [
                new EdgeDTO("action1", 3, 1),
                new EdgeDTO("action2", 1, 2)
            ];
            workflowDTOMock = new WorkflowDTO("prova", workflowNodesDTOMock, workflowEdgesWrongSourceDTOMock);
            expect(() => workflowDTOValidator.validate(workflowDTOMock)).toThrow(new HttpException("Edge source must be a node id", HttpStatus.PRECONDITION_FAILED));
        });

        it("should throw an exception because the edge target must be a node id", () => {
            let workflowEdgesWrongTargetDTOMock = [
                new EdgeDTO("action1", 0, 1),
                new EdgeDTO("action2", 1, 3)
            ];
            workflowDTOMock = new WorkflowDTO("prova", workflowNodesDTOMock, workflowEdgesWrongTargetDTOMock);
            expect(() => workflowDTOValidator.validate(workflowDTOMock)).toThrow(new HttpException("Edge target must be a node id", HttpStatus.PRECONDITION_FAILED));
        });
    });
});

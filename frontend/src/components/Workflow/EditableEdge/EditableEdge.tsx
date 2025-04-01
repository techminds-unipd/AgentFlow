import { BaseEdge, Position, EdgeLabelRenderer, type EdgeProps, MarkerType, useReactFlow, getBezierPath } from "@xyflow/react";
import { JSX, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";

export default function EditableEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    markerEnd = MarkerType.ArrowClosed,
    style,
    label
}: EdgeProps): JSX.Element {
    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition: Position.Right,
        targetX,
        targetY,
        targetPosition: Position.Left
    });
    const handleDelete = (): void => {
        setEdges((edges) => edges.filter((edge) => edge.id !== id));
    };

    const [textInput, setTextInput] = useState<string>(label as string);

    /*eslint-disable @typescript-eslint/no-explicit-any*/
    /*eslint-disable @typescript-eslint/no-unsafe-assignment*/
    /*eslint-disable @typescript-eslint/no-unsafe-member-access*/
    const handleTextChange = (e: any): void => {
        setEdges((edges) => {
            const t = edges.filter((edge) => edge.id === id)[0];
            const allOtherEdges = edges.filter((edge) => edge.id !== id);
            t.label = e.target.value;
            setTextInput(t.label as string);
            return allOtherEdges.concat(t);
        });
    };

    return (
        <>
            <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} data-cy={`edge-${id}`} />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        fontWeight: 700,
                        pointerEvents: "all"
                    }}
                    className="nodrag nopan"
                >
                    <textarea
                        style={{
                            borderRadius: "0.5em",
                            border: "solid var(--maincolor) 0.1em",
                            padding: "0.3em",
                            paddingTop: "1.2em",
                            fontSize: "0.8em",
                            scrollbarWidth: "thin"
                        }}
                        onChange={handleTextChange}
                        value={textInput}
                        spellCheck="false"
                        data-cy={`source-target-node-${id}`}
                    />
                    <IconButton
                        onClick={handleDelete}
                        sx={{ position: "absolute", top: "0", left: "0", padding: "0", margin: "0.1em" }}
                        data-cy={`delete-source-target-node-${id}`}
                    >
                        <ClearIcon style={{ fontSize: "small", padding: "0", margin: "0", color: "black" }} />
                    </IconButton>
                </div>
            </EdgeLabelRenderer>
        </>
    );
}

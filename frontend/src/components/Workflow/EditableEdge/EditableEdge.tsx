import { BaseEdge, Position, EdgeLabelRenderer, type EdgeProps, MarkerType, useReactFlow, getBezierPath } from "@xyflow/react";
import { JSX, useState } from "react";

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
            <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
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
                            fontSize: "0.8em"
                        }}
                        onChange={handleTextChange}
                        value={textInput}
                        spellCheck="false"
                    />
                </div>
            </EdgeLabelRenderer>
        </>
    );
}

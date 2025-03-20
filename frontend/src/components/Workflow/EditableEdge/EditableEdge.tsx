import {
  BaseEdge,
  getStraightPath,
  EdgeLabelRenderer,
  type EdgeProps,
  MarkerType,
  useReactFlow
} from '@xyflow/react';
import { useState } from 'react';

export default function EditableEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd = MarkerType.ArrowClosed,
  style,
  label
}: EdgeProps) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const [textInput, setTextInput] = useState<string>(label as string);

  const handleTextChange = (e: any) => {
    setEdges((edges) => {
      const t = edges.filter((edge) => edge.id === id)[0];
      const allOtherEdges = edges.filter((edge) => edge.id !== id);
      t.label = e.target.value;
      setTextInput(t.label as string);
      return allOtherEdges.concat(t);
    });
  }

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer >
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
            pointerEvents: 'all'
          }}
          className="nodrag nopan"
        >
          <textarea onChange={handleTextChange} value={textInput} />
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

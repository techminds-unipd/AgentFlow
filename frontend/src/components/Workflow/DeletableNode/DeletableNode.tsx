import { Handle, Position, useReactFlow } from '@xyflow/react';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';

interface DeletableNodeInterface {
  id: string;
  data: { label: string };
}

export function DeletableNode({ id, data }: DeletableNodeInterface) {
  const { setNodes, setEdges } = useReactFlow();
  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id))
    setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id))
  }

  return (
    <>
      <div style={{ padding: "0.5em 1em", border: "solid black 0.1em", borderRadius: "5px", backgroundColor: "var(--maincolor)", color: "white" }}>
        {data.label}
        <IconButton onClick={handleDelete} sx={{ position: "absolute", top: "0", right: "0", padding: "0", margin: "0.1em" }}><ClearIcon style={{ fontSize: "small", padding: "0", margin: "0", color: "black" }} /></IconButton>
      </div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </>
  );
}

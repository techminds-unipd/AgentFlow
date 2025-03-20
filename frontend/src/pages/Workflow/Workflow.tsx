import { Edge, Node, ReactFlowProvider, useEdgesState, useNodesState } from "@xyflow/react";
import { WorkflowCanvas } from "../../components/Workflow/WorkflowCanvas/WorkflowCanvas"
import WorkflowSidebar from "../../components/Workflow/WorkflowSidebar/WorkflowSidebar";
//import Grid from "@mui/material/Grid2";
import { DnDProvider } from "../../components/Workflow/DndContext/DnDContext";
import Grid from "@mui/material/Grid2";

export const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  return (
    <main>
      <Grid
        marginBottom={4}
        size={12}
        paddingTop={7}
        sx={{
          display: "flex",
          flexDirection: "row",
        }}>
        <ReactFlowProvider>
          <DnDProvider>
            <WorkflowSidebar />
            <WorkflowCanvas
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              setNodes={setNodes}
              setEdges={setEdges}/>
          </DnDProvider>
        </ReactFlowProvider>
      </Grid>
    </main>
  )
}

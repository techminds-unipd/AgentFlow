import { Edge, Node, ReactFlowProvider, useEdgesState, useNodesState } from "@xyflow/react";
import { WorkflowCanvas } from "../../components/Workflow/WorkflowCanvas/WorkflowCanvas"
import WorkflowSidebar from "../../components/Workflow/WorkflowSidebar/WorkflowSidebar";
import { DnDProvider } from "../../components/Workflow/DndContext/DnDContext";
import Grid from "@mui/material/Grid2";
import { WorkflowHeader } from "../../components/Workflow/WorkflowHeader/WorkflowHeader";

export const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  return (
    <Grid container
      marginLeft={2}
      marginRight={2}>
      <Grid
        marginBottom={4}
        size={12}
        paddingTop={5}
        sx={{
          display: "flex",
          flexDirection: "row",
        }}>
        <ReactFlowProvider>
          <DnDProvider>
            <WorkflowSidebar />
            <Grid
              size={12}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}>
              <WorkflowHeader
                name="WorkflowName" />
              <WorkflowCanvas
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                setNodes={setNodes}
                setEdges={setEdges} />
            </Grid>
          </DnDProvider>
        </ReactFlowProvider>
      </Grid>
    </Grid>

  )
}

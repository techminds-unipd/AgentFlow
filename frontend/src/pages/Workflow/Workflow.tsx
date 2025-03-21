import { Edge, MarkerType, Node, Position, ReactFlowProvider, useEdgesState, useNodesState } from "@xyflow/react";
import { WorkflowCanvas } from "../../components/Workflow/WorkflowCanvas/WorkflowCanvas"
import WorkflowSidebar from "../../components/Workflow/WorkflowSidebar/WorkflowSidebar";
import { DnDProvider } from "../../components/Workflow/DndContext/DnDContext";
import Grid from "@mui/material/Grid2";
import { WorkflowHeader } from "../../components/Workflow/WorkflowHeader/WorkflowHeader";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useGetWorkflow } from "../../hooks/useGetWorkflow";
import { GetWorkflowService } from "../../services/GetWorkflowService";

export const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { name } = useParams();
  const { getWorkflow } = useGetWorkflow(new GetWorkflowService());

  useEffect(() => {
    const fetchWorkflow = async () => {
      const workflow = await getWorkflow(name!);

      const nodes = workflow?.nodes.map(node => {
        return {
          id: String(node.id),
          position: { x: node.position.x, y: node.position.y },
          data: { label: node.data.label },
          sourcePosition: "right" as Position,
          targetPosition: "left" as Position,
          type: node.data.label == "Pastebin" ? "output" : undefined
        }
      })

      const edges = workflow?.edges.map(edge => {
        return {
          id: `${String(edge.source)}-${String(edge.target)}`,
          markerEnd: { type: MarkerType.ArrowClosed },
          type: 'editable',
          label: edge.label,
          source: String(edge.source),
          target: String(edge.target)
        }
      })

      setNodes(nodes!)
      setEdges(edges!)
    }
    fetchWorkflow();
  }, [])


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
                name={name!} />
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

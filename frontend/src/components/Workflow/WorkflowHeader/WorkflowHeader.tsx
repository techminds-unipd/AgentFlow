import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSaveWorkflow } from "../../../hooks/useSaveWorkflow";
import { SaveWorkflowService } from "../../../services/SaveWorkflowService";
import { EdgeDTO, NodeDTO, WorkflowDTO } from "../../../services/dto/WorkflowDTO";
import { useReactFlow } from "@xyflow/react";

interface WorkflowHeaderProps {
  name: string;
}

export const WorkflowHeader = ({ name }: WorkflowHeaderProps) => {
  const { saveWorkflow } = useSaveWorkflow(new SaveWorkflowService());
  const { getNodes, getEdges } = useReactFlow();

  const handleSave = async () => {
    const edges = getEdges().map(edge => new EdgeDTO(edge.label as string, Number(edge.source), Number(edge.target)))
    const nodes = getNodes().map(node => new NodeDTO(Number(node.id), { x: node.position.x, y: node.position.y }, { label: node.data.label as string }))
    console.log(await saveWorkflow(new WorkflowDTO(name, nodes, edges)))
  }

  return (
    <Grid
      size={12}
      paddingBottom={3}
      sx={{
        display: "flex",
        flexDirection: "row",
        columnGap: "2em"
      }}>
      <Typography
        component="h1"
        variant="h4"
        paddingRight="25em"
        sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        {name}
      </Typography>
      <Button
        fullWidth
        variant="contained"
        onClick={handleSave}
        sx={{ backgroundColor: "var(--maincolor)" }}>
        Save
      </Button>
      <Button
        fullWidth
        variant="contained"
        sx={{ backgroundColor: "var(--maincolor)" }}>
        Execute
      </Button>
    </Grid>
  );
};

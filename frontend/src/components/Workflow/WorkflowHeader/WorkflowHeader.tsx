import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSaveWorkflow } from "../../../hooks/useSaveWorkflow";
import { SaveWorkflowService } from "../../../services/SaveWorkflowService";
import { EdgeDTO, NodeDTO, WorkflowDTO } from "../../../services/dto/WorkflowDTO";
import { useReactFlow } from "@xyflow/react";
import { useExecuteWorkflow } from "../../../hooks/useExecuteWorkflow";
import { ExecuteWorkflowService } from "../../../services/ExecuteWorkflowService";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

interface WorkflowHeaderProps {
  name: string;
}

export const WorkflowHeader = ({ name }: WorkflowHeaderProps) => {
  const saveWorkflowHook = useSaveWorkflow(new SaveWorkflowService());
  const { executeWorkflow } = useExecuteWorkflow(new ExecuteWorkflowService())
  const { getNodes, getEdges } = useReactFlow();
  const [openExecuteResultsDialog, setOpenExecuteResultsDialog] = useState(false);
  const [executeResult, setExecuteResult] = useState("");

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarSetMessage] = useState("");
  const [alertColor, setAlertColor] = useState<"success" | "error">("error");

  const handleSave = async () => {
    const edges = getEdges().map(edge => new EdgeDTO(edge.label as string, Number(edge.source), Number(edge.target)))
    const nodes = getNodes().map(node => new NodeDTO(Number(node.id), { x: node.position.x, y: node.position.y }, { label: node.data.label as string }))
    await saveWorkflowHook.saveWorkflow(new WorkflowDTO(name, nodes, edges))
    if (saveWorkflowHook.error) {
      setSnackBarSetMessage(`Cannot save the workflow: ${saveWorkflowHook.error}`);
      setAlertColor("error")
      setOpenSnackBar(true)
    } else {
      setSnackBarSetMessage("Workflow saved successfully");
      setAlertColor("success")
      setOpenSnackBar(true)
    }
  }

  const handleExecute = async () => {
    const edges = getEdges().map(edge => new EdgeDTO(edge.label as string, Number(edge.source), Number(edge.target)))
    const nodes = getNodes().map(node => new NodeDTO(Number(node.id), { x: node.position.x, y: node.position.y }, { label: node.data.label as string }))
    const res = await executeWorkflow(new WorkflowDTO(name, nodes, edges))
    if (res !== undefined) {
      setExecuteResult(res)
      setOpenExecuteResultsDialog(true)
    }
  }

  const handleCloseExecuteResultDialog = () => setOpenExecuteResultsDialog(false);
  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  return (
    <>
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
          onClick={handleExecute}
          sx={{ backgroundColor: "var(--maincolor)" }}>
          Execute
        </Button>
      </Grid>

      <Dialog open={openExecuteResultsDialog} onClose={handleCloseExecuteResultDialog}>
        <DialogTitle>Execute results</DialogTitle>
        <DialogContent>
          {executeResult}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseExecuteResultDialog} sx={{ color: "var(--maincolor)" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message={snackBarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackBar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity={alertColor}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>

    </>
  );
};

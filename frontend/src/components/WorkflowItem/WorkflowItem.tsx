import { Box, Link, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import * as React from "react";
import "../../index.css";
import { useDeleteWorkflow } from "../../hooks/useDeleteWorkflow";

interface WorkflowItemProps {
  name: string;
  setShouldReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WorkflowItem = ( { name, setShouldReload }: WorkflowItemProps ) => {
  const [open, setOpen] = React.useState(false);
  const { deleteWorkflow } = useDeleteWorkflow();

  const handleOpenDialog = () => {
      setOpen(true);
  };

  const handleCloseDialog = () => {
      setOpen(false);
  };

  const handleDeleteWorkflow = () => {
    try {
      deleteWorkflow(name); 
      setShouldReload(true); // Re-rendering della lista
    } catch (error) {
      console.error("Failed to delete workflow:", error);
    }
    handleCloseDialog();
  };
  
  return (
    <>
        <Box
            sx={{
                p: 2,
                borderRadius: 1,
                backgroundColor: "var(--white-text)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: 35,
                width: 717
            }}
        >
          <Link 
            href="#" 
            sx={{ 
              color: "var(--black-text)",
              textDecoration: "underline var(--black-text)",
              fontSize: 20
            }}>
              { name }
            </Link>
            <IconButton onClick={handleOpenDialog}>
              <ClearIcon color="inherit" fontSize="large" />
            </IconButton>
        </Box>
        <Dialog
            open={open}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete your workflow?"}
            </DialogTitle>
            <DialogContent>
              <Typography>If you delete this workflow you won't be able to recover it.</Typography>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseDialog}>No</Button>
            <Button onClick={handleDeleteWorkflow} autoFocus>
                Yes
            </Button>
            </DialogActions>
        </Dialog>
    </>
  );
};
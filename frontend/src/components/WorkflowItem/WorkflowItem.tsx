import { Box, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import * as React from "react";
import "../../index.css";
import { useDeleteWorkflow } from "../../hooks/useDeleteWorkflow";
import { CustomLink } from "../CustomLink/CustomLink";
import { DeleteWorkflowService } from "../../services/DeleteWorkflowService";

interface WorkflowItemProps {
    name: string;
    setShouldReload: React.Dispatch<React.SetStateAction<boolean>>;
    setSnackBarSetMessage: React.Dispatch<React.SetStateAction<string>>;
    setAlertColor: React.Dispatch<React.SetStateAction<"success" | "error">>;
    setOpenSnackBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WorkflowItem = ({
    name,
    setShouldReload,
    setSnackBarSetMessage,
    setAlertColor,
    setOpenSnackBar
}: WorkflowItemProps): React.JSX.Element => {
    const [open, setOpen] = React.useState(false);
    const { deleteWorkflow } = useDeleteWorkflow(new DeleteWorkflowService());

    const handleOpenDialog = (): void => {
        setOpen(true);
    };

    const handleCloseDialog = (): void => {
        setOpen(false);
    };

    const handleDeleteWorkflow = async (): Promise<void> => {
        try {
            const result = await deleteWorkflow(name);
            if (result) {
                setAlertColor("success");
                setSnackBarSetMessage(`Workflow "${name}" deleted successfully.`);
                setShouldReload(true); // Re-rendering della lista
            } else {
                setSnackBarSetMessage("Failed to delete workflow.");
                setAlertColor("error");
            }
        } catch {
            setSnackBarSetMessage("Failed to delete workflow.");
            setAlertColor("error");
        }
        setOpenSnackBar(true);
        handleCloseDialog();
    };

    return (
        <>
            <Box
                p={2}
                borderRadius={1}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                height={35}
                width={750}
                bgcolor={"var(--white-text)"}
            >
                <CustomLink link={`/workflow/${name}`} name={name} fontSize={20} />
                <IconButton onClick={handleOpenDialog} data-cy={`workflow-${name}-delete`}>
                    <ClearIcon color="inherit" fontSize="large" />
                </IconButton>
            </Box>
            <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete your workflow?"}</DialogTitle>
                <DialogContent>
                    <Typography>If you delete this workflow you won't be able to recover it.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>No</Button>
                    <Button
                        onClick={() => {
                            void handleDeleteWorkflow();
                        }}
                        autoFocus
                        data-cy="workflow-delete-confirm"
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

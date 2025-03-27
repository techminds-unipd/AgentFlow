import { Box, Link, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import * as React from "react";
import "../../index.css";
import { useDeleteWorkflow } from "../../hooks/useDeleteWorkflow";

interface WorkflowItemProps {
    name: string;
    setShouldReload: React.Dispatch<React.SetStateAction<boolean>>;
    setSnackBarSetMessage: React.Dispatch<React.SetStateAction<string>>;
    setAlertColor: React.Dispatch<React.SetStateAction<"success" | "error">>;
    setOpenSnackBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WorkflowItem = ({ name, setShouldReload, setSnackBarSetMessage, setAlertColor, setOpenSnackBar }: WorkflowItemProps): React.JSX.Element => {
    const [open, setOpen] = React.useState(false);
    const { deleteWorkflow } = useDeleteWorkflow();

    const handleOpenDialog = (): void => {
        setOpen(true);
    };

    const handleCloseDialog = (): void => {
        setOpen(false);
    };

    const handleDeleteWorkflow = async (): Promise<void> => {
        try {
            const result = await deleteWorkflow(name);
            if(result){
                setAlertColor("success");
                setSnackBarSetMessage(`Workflow "${name}" deleted successfully.`);
                setShouldReload(true); // Re-rendering della lista
            }
            else {
                setSnackBarSetMessage("Failed to delete workflow.");
                setAlertColor("error");
            }
        } catch (error) {
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
                <Link
                    href="#"
                    fontSize={20}
                    sx={{ color: "var(--black-text)", textDecoration: "underline var(--black-text)" }}
                    data-cy={`workflow-${name}`}
                >
                    {name}
                </Link>
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
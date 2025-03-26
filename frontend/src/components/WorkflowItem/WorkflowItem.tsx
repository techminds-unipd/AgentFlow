import { Box, Link, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import * as React from "react";
import "../../index.css";
import { useDeleteWorkflow } from "../../hooks/useDeleteWorkflow";
import { DeleteWorkflowService } from "../../services/DeleteWorkflowService";

interface WorkflowItemProps {
    name: string;
    setShouldReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WorkflowItem = ({ name, setShouldReload }: WorkflowItemProps): React.JSX.Element => {
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
            await deleteWorkflow(name);
            setShouldReload(true); // Re-rendering della lista
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Failed to delete workflow:", error);
        }
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
                <Link href="#" fontSize={20} sx={{ color: "var(--black-text)", textDecoration: "underline var(--black-text)" }}>
                    {name}
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
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

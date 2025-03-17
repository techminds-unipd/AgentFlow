import { Box, TextField, IconButton, Snackbar } from "@mui/material";
import { Add } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import React from "react";
import "../../index.css";
import { useCreateWorkflow } from "../../hooks/useCreateWorkflow";

export const AddWorkflow = () => {
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [snackBarMessage, setSnackBarSetMessage] = React.useState("");
    const [workflowName, setWorkflowName] = React.useState("");

    const { createWorkflow, isLoading, error } = useCreateWorkflow();

    const handleClick = async () => {
        if(!workflowName) {
            setSnackBarSetMessage("Please enter a valid workflow name.");
            setOpenSnackBar(true);
            return;
        }

        try{
            const result = await createWorkflow(workflowName);
            console.log(result?.name);
            console.log(result);
            if (result && result.name) {
                // Se la creazione ha successo
                setSnackBarSetMessage(`Workflow "${result.name}" created successfully.`);
            } else {
                // Se qualcosa non va con la creazione
                setSnackBarSetMessage("Workflow with this name already exists.");
            }
        } catch ( err ) {
            setSnackBarSetMessage(error || "Something went wrong.");
        }

        setOpenSnackBar(true);
    };

    const handleClose = () => {
        setOpenSnackBar(false);
    };

    return (
        <>
            <Box
                component="section"
                sx={{
                    p: 2,
                    borderRadius: 1,
                    backgroundColor: "var(--maincolor)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    width: 750
                }}
            >
                <TextField 
                    value={workflowName}
                    onChange={(e) => setWorkflowName(e.target.value)}
                    placeholder="Insert workflow name" 
                    variant="outlined"
                    sx={{ 
                        backgroundColor: "var(--white-text)", 
                        borderRadius: 1, 
                        flexGrow: 1,
                        "& .MuiInputLabel-root": { color: "gray" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "gray" },
                        "& .MuiFilledInput-root": {
                            backgroundColor: "var(--white-text)",
                            "&:hover": { backgroundColor: "var(--white-text)" }
                        }
                    }} 
                />
                <IconButton aria-label="Add workflow" size="large" onClick={handleClick} disabled={isLoading}>
                    <Add fontSize="large"/>
                </IconButton>
            </Box>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackBarMessage}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </>
    );
};

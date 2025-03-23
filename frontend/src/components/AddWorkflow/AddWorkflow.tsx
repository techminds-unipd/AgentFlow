import { Box, TextField, IconButton, Snackbar, Alert } from "@mui/material";
import { Add } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import "../../index.css";
import { useCreateWorkflow } from "../../hooks/useCreateWorkflow";

interface AddWorkflowProps {
    setShouldReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddWorkflow: React.FC<AddWorkflowProps> = ({ setShouldReload }) => {
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [snackBarMessage, setSnackBarSetMessage] = React.useState("");
    const [alertColor, setAlertColor] = React.useState<"success" | "error">("error");
    const [workflowName, setWorkflowName] = React.useState("");

    const { createWorkflow, isLoading, error } = useCreateWorkflow();

    const handleClick = async () => {
        if (!workflowName) {
            setSnackBarSetMessage("Please enter a valid workflow name.");
            setAlertColor("error");
            setOpenSnackBar(true);
            return;
        }

        try {
            const result = await createWorkflow(workflowName);
            if (result && result.name) {
                // Se la creazione ha successo
                setSnackBarSetMessage(`Workflow "${result.name}" created successfully.`);
                setShouldReload(true); // Re-render di WorkflowList
                setAlertColor("success");
                setWorkflowName("");
            } else {
                // Se qualcosa non va con la creazione, se il problema è perchè c'è il nome uguale verrà stampato in automatico l'errore definito in newWorkflowAPI
                setSnackBarSetMessage(error || "Something went wrong.");
                setAlertColor("error");
            }
        } catch (err) {
            setSnackBarSetMessage(error || "Something went wrong.");
            setAlertColor("error");
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
                borderRadius={1}
                p={2}
                display={"flex"}
                alignItems={"center"}
                gap={1}
                width={750}
                bgcolor={"var(--maincolor)"}
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
                    <Add fontSize="large" />
                </IconButton>
            </Box>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackBarMessage}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
                <Alert onClose={handleClose} severity={alertColor} variant="filled" sx={{ width: "100%" }}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

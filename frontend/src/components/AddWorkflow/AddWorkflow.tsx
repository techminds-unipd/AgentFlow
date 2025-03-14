import { Box, TextField, IconButton, Snackbar, Typography } from "@mui/material";
import { Add as PlusIcon } from "@mui/icons-material";
import React from "react";
import "../../index.css";

export const AddWorkflow = () => {

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
                gap: 1, // Space between elements
                width: 750 // Adjust width as needed
            }}
        >
            <TextField 
                label="Insert workflow name" 
                variant="outlined"
                sx={{ 
                    backgroundColor: "var(--white-text)", 
                    borderRadius: 1, 
                    flexGrow: 1,
                    "& .MuiInputLabel-root": { 
                        color: "gray"
                    },
                    "& .MuiInputLabel-root.Mui-focused": { 
                        color: "gray"
                    },
                    "& .MuiFilledInput-root": {
                        backgroundColor: "var(--white-text)",
                        "&:hover": {
                            backgroundColor: "var(--white-text)"
                        }
                    }
                }} 
            />
            <IconButton aria-label="Add workflow" size="large">
                <PlusIcon />
            </IconButton>
        </Box>
    </>
  );
};
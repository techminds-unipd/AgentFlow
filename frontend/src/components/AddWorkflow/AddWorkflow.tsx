import { Box, TextField, IconButton, Snackbar, Typography, SnackbarCloseReason  } from "@mui/material";
import { Add } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import React from "react";
import "../../index.css";

export const AddWorkflow = () => {
    const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

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
            <IconButton aria-label="Add workflow" size="large" onClick={handleClick}>
                <Add />
            </IconButton>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Note archived"
                action={action}
            />
        </Box>
    </>
  );
};
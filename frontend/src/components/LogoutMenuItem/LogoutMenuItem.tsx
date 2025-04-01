import { MenuItem, Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import "../../index.css";
import { useGoogleToken } from "../../hooks/useGoogleToken";
import { JSX } from "react";
import React from "react";

interface LogoutMenuItem {
    handleCloseMenu(): void;
}

export const LogoutMenuItem = (logoutMenuItemRef: LogoutMenuItem): JSX.Element => {
    const { logoutUser } = useAuth();
    const { removeGoogleToken } = useGoogleToken();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleOpenDialog = (): void => {
        setOpen(true);
    };

    const handleCloseDialog = (): void => {
        setOpen(false);
        logoutMenuItemRef.handleCloseMenu();
    };

    const handleLogout = (): void => {
        removeGoogleToken();
        logoutUser();
        handleCloseDialog();
        logoutMenuItemRef.handleCloseMenu();
        void navigate("/signin");
    };

    return (
        <>
            <MenuItem onClick={handleOpenDialog} data-cy="logout-navitem">
                Logout
            </MenuItem>
            <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to logout?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>No</Button>
                    <Button onClick={handleLogout} autoFocus data-cy="logout-confirm-button">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

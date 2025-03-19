import * as React from "react";
import { MenuItem, Dialog, DialogActions, DialogTitle, Button} from "@mui/material";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import "../../index.css";
import { useGoogleToken } from "../../hooks/useGoogleToken";

interface LogoutMenuItem {
    handleCloseMenu(): void
  }

export const LogoutMenuItem=({handleCloseMenu}: LogoutMenuItem) =>{
    const { logoutUser } = useAuth();
    const { removeGoogleAccount } = useGoogleToken()
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        handleCloseMenu();
    };

    const handleLogout = () => {
        removeGoogleAccount()
        logoutUser();
        handleCloseDialog();
        handleCloseMenu();
        navigate("/signin");
    };
    
    return(
        <>
            <MenuItem onClick={handleOpenDialog}>Logout</MenuItem>
            <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to logout?"}
                </DialogTitle>
                <DialogActions>
                <Button onClick={handleCloseDialog}>No</Button>
                <Button onClick={handleLogout} autoFocus>
                    Yes
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
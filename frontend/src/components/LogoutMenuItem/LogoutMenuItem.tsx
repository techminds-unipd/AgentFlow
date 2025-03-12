import * as React from 'react';
import { MenuItem, Dialog, DialogActions, DialogTitle, Button} from '@mui/material';
import { useNavigate } from "react-router";
import '../../index.css'

interface LogoutMenuItem {
    handleCloseMenu(): void
  }

export const LogoutMenuItem=({handleCloseMenu}: LogoutMenuItem) =>{
    let navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        handleCloseMenu();
    };

    const handleLogout = () => {
        handleCloseDialog();
        navigate("/");
        handleCloseMenu();
        /* qui ci andrà la logica di logut */
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
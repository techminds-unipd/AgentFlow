import { Box, AppBar, Toolbar, Menu, MenuItem, IconButton, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { CustomLink } from "../CustomLink/CustomLink";
import { CustomButton } from "../CustomButton/CustomButton";
import { LogoutMenuItem } from "../LogoutMenuItem/LogoutMenuItem";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/Logo.Tech-Minds-fe.png";
import "../../index.css";
import React from "react";

export const Navbar = (): React.JSX.Element => {
    const { user } = useAuth(); // per verificare se l'utente è loggato o no
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = (): void => {
        setAnchorEl(null);
    };
    const handleNavigate = (): void => {
        handleCloseMenu();
        void navigate("/services");
    };

    return (
        <AppBar
            position="relative"
            sx={{ backgroundColor: "var(--maincolor)", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", color: "var(--white-text)" }}
        >
            <Toolbar disableGutters sx={{ paddingRight: 2 }}>
                <img src={logo} alt="Logo Tech Minds" style={{ height: 40, width: "auto" }} />
                <Typography variant="body1" sx={{ color: "var(--white-text)", fontSize: 20, flexGrow: 1 }}>
                    Agent Flow
                </Typography>
                <Box display="flex" gap={2} alignItems="center">
                    <CustomLink name="Home" link="/" color="white" />
                    <CustomLink name="About Us" link="/aboutus" color="white" />
                    {!user ? (
                        <>
                            <CustomButton name="Sign In" link="/signin" variant="contained" />
                            <CustomButton name="Sign Up" link="/signup" variant="outlined" />
                        </>
                    ) : (
                        <>
                            <CustomLink name="Dashboard" link="/dashboard" color="white" />
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                                data-cy="user-navicon"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
                                <MenuItem onClick={handleNavigate}>Services</MenuItem>
                                <LogoutMenuItem handleCloseMenu={handleCloseMenu} />
                            </Menu>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

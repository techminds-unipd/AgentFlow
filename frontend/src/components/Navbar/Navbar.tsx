import { Box, AppBar, Toolbar, Menu, MenuItem, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { CustomLink } from '../CustomLink/CustomLink.tsx';
import { CustomButton } from '../CustomButton/CustomButton.tsx';
import { Typography } from '@mui/material';
import * as React from 'react';
import logo from '../../assets/Logo.Tech-Minds-fe.png';
import '../../index.css';

export const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar 
                position="static"
                sx={{
                    backgroundColor: 'var(--maincolor)',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                    color: 'var(--white-text)'
                }}>
                <Toolbar disableGutters sx={{ paddingRight: 2}} >
                    <img 
                        src={logo}
                        alt="Logo" 
                        style={{ height: 40, width: 'auto' }} 
                    />
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            color: 'var(--white-text)',
                            fontSize: 20, 
                            flexGrow: 1
                        }}>
                        Agent Flow
                    </Typography>
                    <Box display="flex" gap={2} alignItems="center">
                        <CustomLink name="Home" link="/" />
                        <CustomLink name="About Us" link="/aboutus" />
                        <CustomButton name="Sign In" link="/signin" />
                        <CustomButton name="Sign Up" link="/signup" variant="outlined" />
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu 
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem></MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
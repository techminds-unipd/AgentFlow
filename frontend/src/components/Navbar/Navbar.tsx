import { Grid2 } from '@mui/material';
import { CustomLink } from '../CustomLink/CustomLink.tsx';
import { CustomButton } from '../CustomButton/CustomButton.tsx';
import { Typography } from '@mui/material';
import logo from '../../assets/Logo.Tech-Minds-fe.png';
import '../../index.css';

export const Navbar = () => {
    return (
        <Grid2
            container
            position="fixed"
            top={0}
            width="100%"
            padding={1.5}
            justifyContent="space-between"  
            alignItems="center"
            sx={{
                backgroundColor: 'var(--maincolor)',
                color: 'var(--white-text)',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
            }}
        >
            <Grid2 display="flex" gap={1} alignItems="center">
                <img 
                    src={logo}
                    alt="Logo" 
                    style={{ height: 40, width: 'auto' }} 
                />
                <Typography variant="body1" sx={{ color: 'var(--white-text)' }}>
                    Agent Flow
                </Typography>
            </Grid2>

            <Grid2 display="flex" gap={2} alignItems="center">
                <CustomLink name="Home" link="/" />
                <CustomLink name="About Us" link="/aboutus" />
                <CustomButton name="Sign In" link="/signin" />
                <CustomButton name="Sign Up" link="/signup" variant="outlined" />
            </Grid2>
        </Grid2>
    );
};
import { Link, Typography } from '@mui/material';

interface CustomLinkProps {
    name: string,
    link: string
}

export const CustomLink=( {name, link}: CustomLinkProps) =>{
    return(
        <>
            {name} {link}
        </>
    )
}
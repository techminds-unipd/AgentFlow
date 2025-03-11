import { useLocation } from "react-router";
import { Link, Typography } from '@mui/material';
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
  } from 'react-router';
import React from "react";

interface CustomLinkProps {
    name: string,
    link: string
}

export const CustomLink=( {name, link}: CustomLinkProps) =>{
    const {pathname} = useLocation();
    const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>(
        (props, ref) => (
          <RouterLink
            ref={ref}
            to={link}
            {...props}
          />
        ),
      );
    return(
        <>
            {pathname===link?<Typography>{name}</Typography>:
            <Link component={LinkBehavior} underline='always' color={'warning'}>{name}</Link>
            }
        </>
    )
}
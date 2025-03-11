import { useLocation } from "react-router";
import { Link, Typography } from '@mui/material';
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
  } from 'react-router';
import React from "react";
import '../../index.css'

interface CustomLinkProps {
    name: string,
    link: string
}

/**
 * Componente custom che permette di avere link non circolari. Quando il percorso che viene passato come link
 * è uguale al percorso di React Router in cui si trova il componente, allora viene ritornato un semplice testo con Typography.
 * La funzione LinkBehaviour è stata presa da https://mui.com/material-ui/integrations/routing/
 */

export const CustomLink=( {name, link}: CustomLinkProps) =>{
    const {pathname} = useLocation();
    const LinkBehavior = React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(
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
            {pathname===link?<Typography sx={{ fontSize: 18 }}>{name}</Typography>:
            <Link 
                component={LinkBehavior} 
                underline='always' 
                sx={{ 
                    color: 'var(--white-text)',
                    textDecoration: 'underline var(--white-text)',
                    fontSize: 18
                }}
            >
                {name}
            </Link>
            }
        </>
    )
}
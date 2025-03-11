import { Button } from '@mui/material';
import {
    Link as RouterButton,
    LinkProps as RouterButtonProps,
  } from 'react-router';
import React from "react";

interface CustomButtonProps {
    name: string,
    link: string,
    variant: "contained" | "outlined"
}

export const CustomButton=( {name, link, variant}: CustomButtonProps) =>{
    const ButtonBehavior = React.forwardRef<HTMLAnchorElement, Omit<RouterButtonProps, 'to'>>(
        (props, ref) => (
          <RouterButton
            ref={ref}
            to={link}
            {...props}
          />
        ),
      );
    return(
        <>
            <Button component={ButtonBehavior} href={link} variant={variant}>{name}</Button>
        </>
    )
}
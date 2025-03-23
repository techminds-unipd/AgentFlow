import { Button } from "@mui/material";
import { Link as RouterButton, LinkProps as RouterButtonProps } from "react-router";
import React, { JSX } from "react";
import "../../index.css";

interface CustomButtonProps {
    name: string;
    link: string;
    variant: "contained" | "outlined";
}

interface ButtonStyles {
    textColor: string;
    backgroundColor: string;
}

export const CustomButton = ({ name, link, variant = "contained" }: CustomButtonProps): JSX.Element => {
    const getButtonStyles = (variant: string): ButtonStyles => {
        if (variant === "outlined") return { textColor: "var(--white-text)", backgroundColor: "var(--maincolor)" };
        else return { textColor: "var(--maincolor)", backgroundColor: "var(--white-text)" };
    };

    const { textColor, backgroundColor } = getButtonStyles(variant);

    const ButtonBehavior = React.forwardRef<HTMLAnchorElement, Omit<RouterButtonProps, "to">>((props, ref) => (
        <RouterButton ref={ref} to={link} {...props} />
    ));

    return (
        <Button
            component={ButtonBehavior}
            href={link}
            variant={variant}
            sx={{
                backgroundColor: backgroundColor,
                color: textColor,
                borderColor: textColor,
                "&:hover": { backgroundColor: textColor, color: backgroundColor }
            }}
        >
            {name}
        </Button>
    );
};

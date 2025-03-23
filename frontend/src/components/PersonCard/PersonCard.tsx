import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import { Box, Typography } from "@mui/material";
import "../../index.css";
import { JSX } from "react";

interface PersonCardProps {
    name: string;
    gitHubUsername: string;
}

export const PersonCard = ({ name, gitHubUsername }: PersonCardProps): JSX.Element => {
    if (name === "") name = "Name Surname";
    if (gitHubUsername === "") gitHubUsername = "github";
    return (
        <Box textAlign={"center"}>
            <Link
                href={`https://github.com/${gitHubUsername}`}
                target="_blank"
                fontSize={18}
                sx={{ color: "var(--maincolor)", textDecoration: "underline var(--maincolor)" }}
            >
                <Avatar alt={name} src={`https://github.com/${gitHubUsername}.png`} sx={{ width: 150, height: 150 }} />
                <Typography marginTop={2}>{name}</Typography>
            </Link>
        </Box>
    );
};

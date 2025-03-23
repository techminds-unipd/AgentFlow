import { Link, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import GitHubIcon from "@mui/icons-material/GitHub";
import "../../index.css";

export const Footer = () => {
    return (
        <footer>
            <Grid
                container
                textAlign={"center"}
                width={"100%"}
                padding={1.75}
                sx={{ backgroundColor: "var(--maincolor)", color: "var(--white-text)" }}
            >
                <Grid size={"grow"} display="flex" gap={1} justifyContent="center" alignItems={"center"}>
                    <GitHubIcon fontSize="small" />
                    <Link
                        href="https://github.com/techminds-unipd"
                        target="_blank"
                        sx={{ color: "var(--white-text)", textDecoration: "underline var(--white-text)" }}
                    >
                        GitHub repository
                    </Link>
                </Grid>
                <Grid size={"grow"}>
                    <Typography>Made by Tech Minds</Typography>
                </Grid>
            </Grid>
        </footer>
    );
};

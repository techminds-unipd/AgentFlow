import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import { AddWorkflow } from "../../components/AddWorkflow/AddWorkflow";
import { WorkflowList } from "../../components/WorkflowList/WorkflowList";
import { useState, JSX } from "react";
import { useAuth } from "../../hooks/useAuth";

export const Dashboard = (): JSX.Element => {
    const [shouldReload, setShouldReload] = useState<boolean>(false);
    const { user } = useAuth();
    return (
        <main>
            <Grid container>
                <Grid size={12} paddingTop={7} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography component="h1" variant="h4" textAlign={"center"} sx={{ marginBottom: 2 }}>
                        Hello {user?.username}!
                    </Typography>
                    <AddWorkflow setShouldReload={setShouldReload} />
                </Grid>
                <Grid size={12} paddingTop={7} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <WorkflowList shouldReload={shouldReload} setShouldReload={setShouldReload} />
                </Grid>
            </Grid>
        </main>
    );
};

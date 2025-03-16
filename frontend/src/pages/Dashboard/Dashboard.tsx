import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import "./Dashboard.css";
import { AddWorkflow } from "../../components/AddWorkflow/AddWorkflow";
import { WorkflowList } from "../../components/WorkflowList/WorkflowList";

export const Dashboard = () => {
  return (
    <main>
      <Grid container>
        <Grid 
            size={12}
            paddingTop={7} 
            sx={{
                display: "flex", 
                flexDirection: "column",
                alignItems: "center"
            }}>
          <Typography component="h1" variant="h4" textAlign={"center"} sx= {{ marginBottom: 2 }}>
            Hello username!
          </Typography>
          <AddWorkflow />
        </Grid>
        <Grid 
          size={12}
          paddingTop={7} 
          sx={{
              display: "flex", 
              flexDirection: "column",
              alignItems: "center"
          }}>
          <WorkflowList />
        </Grid>
      </Grid>
    </main>
  );
};

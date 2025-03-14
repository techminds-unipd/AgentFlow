import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import "./Dashboard.css";
import "../../components/AddWorkflow/AddWorkflow";
import { AddWorkflow } from "../../components/AddWorkflow/AddWorkflow";

export const Dashboard = () => {
  return (
    <main>
      <Grid container>
        <Grid size={12} marginLeft={10} marginRight={10} paddingTop={7}>
          <Typography component="h1" variant="h4" textAlign={"center"}>
            Hello username!
          </Typography>
          <AddWorkflow />
        </Grid>
      </Grid>
    </main>
  );
};

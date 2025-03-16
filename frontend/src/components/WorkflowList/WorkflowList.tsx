import Grid from "@mui/material/Grid2";
import { Typography, Box } from "@mui/material";
import { WorkflowItem } from "../../components/WorkflowItem/WorkflowItem";

export const WorkflowList = () => {
  return (
    <>
      <Grid container 
          sx={{
              display: "flex", 
              flexDirection: "column",
              alignItems: "center"
          }}>
          <Typography component="h2" variant="h5" textAlign={"center"}>
            Your workflows
          </Typography>
          <Box
            sx={{
              p: 0.5,
              borderRadius: 1,
              backgroundColor: "var(--maincolor)",
              width: 750,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: 0.5
            }}
          >
            <WorkflowItem />
            <WorkflowItem />
            <WorkflowItem />
            <WorkflowItem />
            <WorkflowItem />
            <WorkflowItem />
            <WorkflowItem />
            <WorkflowItem />
            <WorkflowItem />
          </Box>
        </Grid>
    </>
  );
};
import Grid from "@mui/material/Grid2";
import { Typography, Box } from "@mui/material";
import { WorkflowItem } from "../../components/WorkflowItem/WorkflowItem";

export const WorkflowList = () => {
  return (
    <>
      <Grid container>
        <Grid 
            size={12} 
            marginLeft={10} 
            marginRight={10} 
            paddingTop={3} 
            sx={{
                display: "flex", 
                flexDirection: "column",
                alignItems: "center"
            }}>
          <Typography component="h2" variant="h5" textAlign={"center"}>
            Your workflows
          </Typography>
        </Grid>
        <Box
          sx={{
              p: 2,
              borderRadius: 1,
              backgroundColor: "var(--maincolor)",
              width: 750
          }}
        >
          <WorkflowItem />
        </Box>
      </Grid>
    </>
  );
};
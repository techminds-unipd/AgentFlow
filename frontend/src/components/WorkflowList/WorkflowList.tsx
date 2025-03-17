import Grid from "@mui/material/Grid2";
import { Typography, Box, CircularProgress } from "@mui/material";
import { WorkflowItem } from "../../components/WorkflowItem/WorkflowItem";
import { useAllWorkflow } from "../../hooks/useAllWorkflow";

export const WorkflowList = () => {
  const { workflowList, isLoading, error } = useAllWorkflow();
  console.log("WorkflowList data:", workflowList);
console.log("Type of names:", Array.isArray(workflowList));
  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
          gap: 0.5,
        }}
      >
        {/*per il caricamento*/}
        {isLoading && <CircularProgress sx={{ alignSelf: "center" }} />}

        {/*per eventuali errori*/}
        {error && (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        )}

        {/*per visualizzare i WorkflowItem*/}
        {workflowList?.map((workflowName, index) => (
          <WorkflowItem key={index} name={workflowName} />
        ))}
      </Box>
    </Grid>
  );
};
import Grid from "@mui/material/Grid2";
import { Typography, Box, CircularProgress } from "@mui/material";
import { WorkflowItem } from "../../components/WorkflowItem/WorkflowItem";
import { useAllWorkflow } from "../../hooks/useAllWorkflow";
import React, { useEffect } from "react";

interface WorkflowListProps {
  shouldReload: boolean;
  setShouldReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WorkflowList: React.FC<WorkflowListProps> = ({ shouldReload, setShouldReload }) => {
  const { workflowList, isLoading, error, refetch } = useAllWorkflow();
  
  useEffect(() => {
    if (shouldReload) {
        refetch(); // Ricarica i workflow
        setShouldReload(false); // Reset dello stato
    }
}, [shouldReload, setShouldReload, refetch]);
  
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h2" variant="h5" textAlign={"center"} sx= {{ marginBottom: 2 }}>
          Your workflows
        </Typography>
        <Box
          sx={{
            p: 0.5,
            borderRadius: 1,
            backgroundColor: "var(--maincolor)",
            width: 782,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
        {workflowList?.length === 0 ? (
            <Typography component="h3" variant="h6" textAlign={"center"} sx={{ color: "var(--white-text)", padding: 2}}>
            You don't have any workflow!
          </Typography>
        ) : (
          <>
              {/*per il caricamento*/}
              {isLoading && <CircularProgress sx={{ alignSelf: "center" }} />}

              {/*per eventuali errori*/}
              {error && (
                <Typography color="error" textAlign="center">
                  {error}
                </Typography>
              )}

              {/*per visualizzare i WorkflowItem*/}
              {workflowList?.slice().reverse().map((workflowName, index) => (
                <WorkflowItem key={index} name={workflowName} setShouldReload={setShouldReload}/>
              ))}
          </>
          )}
        </Box>
      </Grid>
    </>
  );
};
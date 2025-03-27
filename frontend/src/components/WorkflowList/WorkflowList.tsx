import Grid from "@mui/material/Grid2";
import { Typography, Box, CircularProgress } from "@mui/material";
import { WorkflowItem } from "../../components/WorkflowItem/WorkflowItem";
import { useAllWorkflow } from "../../hooks/useAllWorkflows";
import React, { useEffect } from "react";
import { AllWorkflowsService } from "../../services/AllWorkflowsService";

interface WorkflowListProps {
    shouldReload: boolean;
    setShouldReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WorkflowList: React.FC<WorkflowListProps> = ({ shouldReload, setShouldReload }) => {
    const { workflowList, isLoading, error, refetch } = useAllWorkflow(new AllWorkflowsService());

    useEffect(() => {
        if (shouldReload) {
            void refetch(); // Ricarica i workflow
            setShouldReload(false); // Reset dello stato
        }
    }, [shouldReload, setShouldReload, refetch]);

    return (
        <>
            <Grid container display={"flex"} flexDirection={"column"} alignItems={"center"} marginBottom={5}>
                <Typography component="h2" variant="h5" textAlign={"center"} sx={{ marginBottom: 2 }}>
                    Your workflows
                </Typography>
                <Box
                    p={0.5}
                    borderRadius={1}
                    width={782}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    gap={0.5}
                    bgcolor={"var(--maincolor)"}
                >
                    {workflowList?.length === 0 ? (
                        <Typography
                            component="h3"
                            variant="h6"
                            textAlign={"center"}
                            sx={{ color: "var(--white-text)", padding: 2 }}
                        >
                            You don't have any workflow!
                        </Typography>
                    ) : (
                        <>
                            {/*per il caricamento*/}
                            {isLoading && <CircularProgress sx={{ alignSelf: "center" }} />}

                            {/*per eventuali errori*/}
                            {error !== null && (
                                <Typography textAlign="center" sx={{ color: "white" }}>
                                    It seems like something isn't working correctly.
                                </Typography>
                            )}

                            {/*per visualizzare i WorkflowItem*/}
                            {workflowList
                                ?.slice()
                                .reverse()
                                .map((workflowName, index) => (
                                    <WorkflowItem key={index} name={workflowName} setShouldReload={setShouldReload} />
                                ))}
                        </>
                    )}
                </Box>
            </Grid>
        </>
    );
};

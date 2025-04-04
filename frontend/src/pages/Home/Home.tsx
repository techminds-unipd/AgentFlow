import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import { JSX } from "react";
import "./Home.css";
import workflowExample from "../../assets/workflow-example.png";

export const Home = (): JSX.Element => {
    return (
        <main>
            <Grid container spacing={5} p={10}>
                <Grid size={12} textAlign={"center"}>
                    <Typography variant="h1">Agent Flow</Typography>
                    <Typography variant="h2">Your personal assistant.</Typography>
                </Grid>
                <Grid container size={12} paddingTop={5}>
                    <Grid size={4}>
                        <Card variant="outlined" sx={{ backgroundColor: "var(--maincolor)", color: "var(--white-text)" }}>
                            <CardContent>
                                <Typography variant="h3">What does it do?</Typography>
                                <Typography fontSize={20}>
                                    Agent Flow is a web application that executes all those boring and repetitive workflows on
                                    your behalf. These automations seemingly integrate with services like Gmail, Google Calendar
                                    and Pastebin. With Agent Flow, you can set up custom workflows to manage emails, schedule
                                    events, or handle text-based operations, all in a simple and intuitive way.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={4}>
                        <Card variant="outlined" sx={{ backgroundColor: "var(--maincolor)", color: "var(--white-text)" }}>
                            <CardContent>
                                <Typography variant="h3" marginBottom={1}>
                                    Example of a workflow
                                </Typography>
                                <img src={workflowExample} id="workflowExample" alt="Example of a workflow" />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={4}>
                        <Card variant="outlined" sx={{ backgroundColor: "var(--maincolor)", color: "var(--white-text)" }}>
                            <CardContent>
                                <Typography variant="h3">How does it work?</Typography>
                                <Typography fontSize={20}>
                                    This webapp uses cutting-edge tecnologies as well as producion-ready and well tested ones. The
                                    interface is made in React, with the workflow editor being made in React Flow. The backend is
                                    made in NestJs and MongoDB. The workflow executor, also known as Agent, uses Flask to handle
                                    requests, Langchain for the tools and Groq for the inference service.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </main>
    );
};

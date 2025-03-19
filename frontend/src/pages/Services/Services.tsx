import Grid from "@mui/material/Grid2";
import { Button, Divider, Typography } from "@mui/material";
import { GmailNode } from "../../components/Nodes/GmailNode/GmailNode";
import { CalendarNode } from "../../components/Nodes/CalendarNode/CalendarNode";
import { PastebinNode } from "../../components/Nodes/PastebinNode/PastebinNode";
import "../../index.css";
import { API_BASE_URL } from "../../services/constants";

export const Services = () => {
  const URL = API_BASE_URL + "/google/auth";
  return (
    <main>
      <Grid container>
        <Grid size={12} marginTop={5}>
          <Typography variant="h3" component={"h1"}>
            Services
          </Typography>
        </Grid>
        <Grid size={12} marginTop={2} marginBottom={2}>
          <Divider />
        </Grid>
        <Grid size={12} container>
          <Grid size={4}>
            <GmailNode disabled /> <br />
            <CalendarNode disabled />
          </Grid>
          <Grid size={8} alignContent={"center"}>
            <Button
              variant={"contained"}
              sx={{ backgroundColor: "var(--maincolor)" }}
              href={URL}
            >
              Link your Google account
            </Button>
          </Grid>
        </Grid>
        <Grid size={12} marginTop={2} marginBottom={2}>
          <Divider />
        </Grid>
        <Grid
          size={12}
          container
          textAlign={"left"}
          justifyContent="center"
          display={"flex"}
        >
          <Grid size={4}>
            <PastebinNode />
          </Grid>
          <Grid size={8} alignContent={"center"}>
            <Typography>This service is always available.</Typography>
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
};

import Grid from "@mui/material/Grid2";
import { Button, Divider, Typography } from "@mui/material";
import { GmailNode } from "../../components/Nodes/GmailNode/GmailNode";
import { CalendarNode } from "../../components/Nodes/CalendarNode/CalendarNode";
import { PastebinNode } from "../../components/Nodes/PastebinNode/PastebinNode";
import "../../index.css";

export const Services = () => {
    const URL = "http://localhost:3000/google/auth"
  const ButtonClicked = () => {
    fetch(URL, {
      method: "GET",
      headers: {"Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods":"POST, GET"
      }
    })
      .then((response) => {
        // HTTP 301 response
        console.log(response);
      })
      .catch(function (err) {
        console.info(err + " url: " + URL);
      });
  };
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
              onClick={ButtonClicked}
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
            <Typography>This service is always available</Typography>
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
};

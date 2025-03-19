import Grid from "@mui/material/Grid2";
import { Button, Divider, Typography } from "@mui/material";
import { GmailNode } from "../../components/Nodes/GmailNode/GmailNode";
import { CalendarNode } from "../../components/Nodes/CalendarNode/CalendarNode";
import { PastebinNode } from "../../components/Nodes/PastebinNode/PastebinNode";
import "../../index.css";
import { API_BASE_URL } from "../../services/constants";
import { useGoogleToken } from "../../hooks/useGoogleToken";
import { useState, useEffect } from "react";

export const Services = () => {
  const URL = API_BASE_URL + "/google/auth";
  const {googleToken, removeGoogleAccount} = useGoogleToken();
  const [buttonText, setButtonText] = useState("");
  const [isNodeEnabled, setIsNodeEnabled] = useState(false)
  useEffect(() => {
    if (googleToken) {
      setButtonText("Unlink your Google account");
      setIsNodeEnabled(true)
    } else {
      setButtonText("Link your Google account");
      setIsNodeEnabled(false)
    }
  }, [googleToken]);
  const handleButtonClick = async()=>{
    if(googleToken){
      removeGoogleAccount();
      setButtonText("Link your Google account")
    }else{
      window.open(URL)
    }
  }
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
            <GmailNode disabled={!isNodeEnabled}/> <br />
            <CalendarNode disabled={!isNodeEnabled} />
          </Grid>
          <Grid size={8} alignContent={"center"}>
            <Button
              variant={"contained"}
              sx={{ backgroundColor: "var(--maincolor)" }}
              onClick={handleButtonClick}
            >
              {buttonText}
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

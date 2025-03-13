import { PersonCard } from "../../components/PersonCard/PersonCard";
import Grid from "@mui/material/Grid2";
import { Typography, Link } from "@mui/material";
import "./AboutUs.css";

export const AboutUs = () => {
  return (
    <main>
      <Grid container>
        <Grid container justifyContent="center" size={12} marginBottom={4}>
          <img src="/Logo-TechMinds.png" alt="Tech Minds logo" className="logo"/>
        </Grid>
        <Grid
          container
          gap={6}
          alignItems="center"
          justifyContent="center"
          width={"100%"}
          marginTop={3}
        >
          <Grid>
            <PersonCard name="Alessandro Bressan" GitHubUsername="T-brex" />
          </Grid>
          <Grid>
            <PersonCard name="Samuele Corradin" GitHubUsername="Jacky8703" />
          </Grid>
          <Grid>
            <PersonCard name="Tommaso Lazzarin" GitHubUsername="tlazzarin" />
          </Grid>
          <Grid>
            <PersonCard name="Leonardo Salviato" GitHubUsername="leosalvi03" />
          </Grid>
          <Grid>
            <PersonCard name="Matteo Squarzoni" GitHubUsername="MatteoSquarz" />
          </Grid>
          <Grid>
            <PersonCard name="Giuseppe Tutino" GitHubUsername="Giuseppe5000" />
          </Grid>
          <Grid>
            <PersonCard name="Caterina Vallotto" GitHubUsername="cvallott" />
          </Grid>
        </Grid>
        <Grid size={12} marginLeft={10} marginRight={10} paddingTop={7}>
          <Typography textAlign={"center"}>
            This website is made by Tech Minds, a passionate SWE group from the
            University of Padova. You can find our GitHub profile{" "}
            <Link
              target="_blank"
              href="https://github.com/techminds-unipd"
              sx={{
                color: "var(--maincolor)",
                textDecoration: "underline var(--maincolor)",
              }}
            >
              here
            </Link>
            .
          </Typography>
        </Grid>
      </Grid>
    </main>
  );
};

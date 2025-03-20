import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface WorkflowHeaderProps {
    name: string;
}

export const WorkflowHeader = ({name}: WorkflowHeaderProps) => {
  return (
    <Grid
      size={12}
      paddingBottom={3}
      sx={{
        display: "flex",
        flexDirection: "row",
        columnGap: "2em"
      }}>
      <Typography
        component="h1"
      variant="h4"
      paddingRight="25em"
      sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
      >
      {name}
      </Typography>
      <Button
        fullWidth
      variant="contained"
      sx={{ backgroundColor: "var(--maincolor)" }}>
        Save
      </Button>
      <Button
        fullWidth
        variant="contained"
        sx={{ backgroundColor: "var(--maincolor)" }}>
        Execute
      </Button>
    </Grid>
  );
};

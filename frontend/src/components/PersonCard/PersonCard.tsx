import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";
import "../../index.css";

interface PersonCardProps {
  name: string;
  GitHubUsername: string;
}

export const PersonCard = ({ name, GitHubUsername }: PersonCardProps) => {
  return (
    <Box textAlign={"center"}>
      <Link
        href={`https://github.com/${GitHubUsername}`}
        target="_blank"
        fontSize={18}
        sx={{
          color: "var(--maincolor)",
          textDecoration: "underline var(--maincolor)",
        }}
      >
        <Avatar
          alt={name}
          src={`https://github.com/${GitHubUsername}.png`}
          sx={{ width: 150, height: 150 }}
        />
        {name}
      </Link>
    </Box>
  );
};

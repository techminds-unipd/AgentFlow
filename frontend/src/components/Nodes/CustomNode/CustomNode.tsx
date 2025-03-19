import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import "./CustomNode.css";
import { JSX, useState } from "react";

export interface CustomNodeProps {
  dialogTitle?: string;
  dialogContent?: JSX.Element;
  nodeTitle?: string;
  type?: "in" | "out" | "in-out";
  disabled?: boolean;
  draggable?: boolean;
}

export const CustomNode = ({
  nodeTitle = "nodeTitle",
  dialogTitle = "Description",
  dialogContent = (
    <>
      Short description of the block
      <br />
      <br />
      <Divider />
      <Typography variant="h6" sx={{ margin: "16px 0", color: "black" }}>
        Available features
      </Typography>
      <ul style={{ listStylePosition: "inside" }}>
        <li>Feature 1</li>
        <li>Feature 2</li>
      </ul>
    </>
  ),
  type = "in-out",
  disabled = false,
  draggable = false,
}: CustomNodeProps) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const mainColor = !disabled ? "var(--maincolor)" : "var(--disabled-outline)";
  const backgroundColor = !disabled ? "white" : "var(--disabled-background)";
  return (
    <>
      <Button
        onClick={handleOpen}
        variant="outlined"
        size="large"
        draggable={draggable}
        sx={{
          margin: "10px",
          borderWidth: 2,
          borderColor: mainColor,
          backgroundColor: backgroundColor,
          color: mainColor,
          textTransform: "none",
          fontSize: "1.2em",
          overflow: "hidden",
          minHeight: "3em",
          transition: "background-color 0.2s ease-in-out",

          "&:hover": {
            backgroundColor: disabled ? "#f0f0f0" : "#f0f0f0", // Grigio chiaro quando passi sopra
          },

          // Semicerchio sinistro (mostrato solo se type è "in" o "in-out")
          "&::before":
            type === "in" || type === "in-out"
              ? {
                  content: '""',
                  position: "absolute",
                  width: ".35em",
                  height: ".7em",
                  backgroundColor: mainColor,
                  left: 0,
                  borderRadius: "0 100px 100px 0",
                }
              : {},

          // Semicerchio destro (mostrato solo se type è "out" o "in-out")
          "&::after":
            type === "out" || type === "in-out"
              ? {
                  content: '""',
                  position: "absolute",
                  width: ".35em",
                  height: ".7em",
                  backgroundColor: mainColor,
                  right: 0,
                  borderRadius: "100px 0 0 100px",
                }
              : {},
        }}
      >
        {nodeTitle}
        {/* Icona Info */}
        <InfoOutlinedIcon
          fontSize="small"
          sx={{
            position: "absolute",
            top: "-5px",
            right: "-5px",
            padding: "5px",
          }}
        ></InfoOutlinedIcon>
      </Button>
      {/* Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          {dialogContent}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: mainColor }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

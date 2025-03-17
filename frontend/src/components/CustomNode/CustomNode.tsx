import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import "./CustomNode.css";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

interface CustomNodeProps {
  dialogTitle?: string;
  dialogContent?: string;
  nodeTitle?: string;
  type?: "in" | "out" | "in-out";
  disabled?: boolean;
  draggable?: boolean;
}

export const CustomNode = ({
  nodeTitle = "nodeTitle",
  dialogTitle = "dialogTitle",
  dialogContent = "dialogContent",
  type = "in-out",
  disabled = false,
  draggable = false,
}: CustomNodeProps) => {
    console.log(draggable)
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
          //borderRadius: "5px",
          margin: "10px",
          borderWidth: 2,
          borderColor: mainColor,
          backgroundColor: backgroundColor,
          color: mainColor,
          textTransform: "none",
          fontSize: "1.2em",
          //display: "flex",
          //alignItems: "center",
          //justifyContent: "center",
          //position: "relative",
          overflow: "hidden",
          //minWidth: "150px",
          minHeight: "3em",

          // Semicerchio sinistro (mostrato solo se type è "in" o "in-out")
          "&::before":
            type === "in" || type === "in-out"
              ? {
                  content: '""',
                  position: "absolute",
                  width: ".4em",
                  height: ".8em",
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
                  width: ".4em",
                  height: ".8em",
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
          onClick={handleOpen}
          sx={{
            position: "absolute",
            top: "-5px",
            right: "-5px",
            borderRadius: "50%",
            padding: "5px",
            margin: "0px 0px 10px 10px",
            //lascio boxShadow?
            //boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
        ></InfoOutlinedIcon>
      </Button>
      {/* Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

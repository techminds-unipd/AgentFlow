import { Divider, Typography } from "@mui/material";
import { CustomNode, CustomNodeProps } from "../CustomNode/CustomNode.tsx";

export const PastebinNode = ({
  nodeTitle = "Pastebin",
  dialogTitle = "Pastebin description",
  dialogContent = (
    <>
      A node connected to the Google Calendar service that allows you to manage
      events, appointments and reminders.
      <br /><br />
      <Divider />
      <Typography variant="h6">Available features:</Typography>
      <ul style={{ listStylePosition: "inside"}}>
        <li>Create a document</li>
        <li>Write a document</li>
      </ul>
    </>
  ),
  type = "in",
  disabled = false,
  draggable = false,
}: CustomNodeProps) => {
  return (
    <CustomNode
      nodeTitle={nodeTitle}
      dialogTitle={dialogTitle}
      dialogContent={dialogContent}
      draggable={draggable}
      disabled={disabled}
      type={type}
    />
  );
};

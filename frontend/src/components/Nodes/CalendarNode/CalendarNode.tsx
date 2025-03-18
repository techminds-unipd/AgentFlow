import { Divider, Typography } from "@mui/material";
import { CustomNode, CustomNodeProps } from "../CustomNode/CustomNode.tsx";

export const CalendarNode = ({
  nodeTitle = "Calendar",
  dialogTitle = "Calendar description",
  dialogContent = (
    <>
      A node connected to the Google Calendar service that allows you to manage
      events, appointments and reminders.
      <br />
      <br />
      <Divider />
      <Typography variant="h6" sx={{ margin: "16px 0", color: "black" }}>
        {" "}
        Available features
      </Typography>
      <ul style={{ listStylePosition: "inside" }}>
        <li>Create an event</li>
        <li>Search through created events</li>
      </ul>
    </>
  ),
  type = "in-out",
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

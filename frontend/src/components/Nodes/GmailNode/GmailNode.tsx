import { Divider, Typography } from "@mui/material";
import { CustomNode, CustomNodeProps } from "../CustomNode/CustomNode.tsx";

export const GmailNode = ({
  nodeTitle = "Gmail",
  dialogTitle = "Gmail description",
  dialogContent = (
    <>
      A node for integration with Gmail mailbox. It allows you to
      manage emails directly without having to open webmail.
      <br/><br/>
      <Divider />
      <Typography variant="h6">Available features</Typography>
      <ul style={{ listStylePosition: "inside"}}>
        <li>Search for an email</li>
        <li>Retrieve a specific email</li>
        <li>Create a draft</li>
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

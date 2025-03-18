import { Divider, Typography } from "@mui/material";
import { CustomNode, CustomNodeProps } from "../CustomNode/CustomNode.tsx";

export const PastebinNode = ({
  nodeTitle = "Pastebin",
  dialogTitle = "Pastebin description",
  dialogContent = (
    <>
      A node that lets you paste, save, and share text or code. Useful for quick
      notes, programming snippets, or temporary documents.
      <br />
      <br />
      <Divider />
      <Typography variant="h6" sx={{ margin: "16px 0", color: "black" }}>
        {" "}
        Available features
      </Typography>
      <ul style={{ listStylePosition: "inside" }}>
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

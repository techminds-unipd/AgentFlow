import { Divider, Typography } from "@mui/material";
import { CustomNode, CustomNodeProps } from "../CustomNode/CustomNode.tsx";
import { JSX } from "react";

export const PastebinNode = ({
    nodeTitle = "Pastebin",
    dialogTitle = "Pastebin description",
    dialogContent = (
        <>
            <span data-cy="Pastebin-info">
                A node that lets you paste, save, and share text or code. Useful for quick notes, programming snippets, or
                temporary documents.
            </span>
            <br />
            <br />
            <Divider />
            <Typography variant="h6" sx={{ margin: "16px 0", color: "black" }}>
                {" "}
                Available features
            </Typography>
            <ul style={{ listStylePosition: "inside" }} data-cy="Pastebin-node-features">
                <li>Create a document</li>
                <li>Write a document</li>
            </ul>
        </>
    ),
    type = "in",
    disabled = false,
    draggable = false
}: CustomNodeProps): JSX.Element => {
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

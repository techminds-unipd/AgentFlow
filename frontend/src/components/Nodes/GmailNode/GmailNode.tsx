import { Divider, Typography } from "@mui/material";
import { CustomNode, CustomNodeProps } from "../CustomNode/CustomNode.tsx";
import { JSX } from "react";

export const GmailNode = ({
    nodeTitle = "Gmail",
    dialogTitle = "Gmail description",
    dialogContent = (
        <>
            A node connected to the Gmail service. It allows you to manage emails directly without having to open your webmail.
            <br />
            <br />
            <Divider />
            <Typography variant="h6" sx={{ margin: "16px 0", color: "black" }}>
                {" "}
                Available features
            </Typography>
            <ul style={{ listStylePosition: "inside" }}>
                <li>Search for an email</li>
                <li>Retrieve a specific email</li>
                <li>Create a draft</li>
            </ul>
        </>
    ),
    type = "in-out",
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

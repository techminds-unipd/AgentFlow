import { Divider, Typography } from "@mui/material";
import { CustomNode, CustomNodeProps } from "../CustomNode/CustomNode.tsx";
import { JSX } from "react";

export const CalendarNode = ({
    nodeTitle = "GCalendar",
    dialogTitle = "GCalendar description",
    dialogContent = (
        <>
            <span data-cy="GCalendar-info">
                A node connected to the Google Calendar service that allows you to manage events, appointments and reminders.
            </span>
            <br />
            <br />
            <Divider />
            <Typography variant="h6" sx={{ margin: "16px 0", color: "black" }}>
                {" "}
                Available features
            </Typography>
            <ul style={{ listStylePosition: "inside" }} data-cy="GCalendar-node-features">
                <li>Create an event</li>
                <li>Search through created events</li>
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

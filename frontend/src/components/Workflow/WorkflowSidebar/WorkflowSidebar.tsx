import { JSX } from "react";
import { useGoogleToken } from "../../../hooks/useGoogleToken";
import { CalendarNode } from "../../Nodes/CalendarNode/CalendarNode";
import { GmailNode } from "../../Nodes/GmailNode/GmailNode";
import { PastebinNode } from "../../Nodes/PastebinNode/PastebinNode";
import { useDnD } from "../../../context/DnDContext";
import { Box, Typography } from "@mui/material";

const WorkflowSidebar = (): JSX.Element => {
    const [, setService] = useDnD();
    const google = useGoogleToken();

    /*eslint-disable @typescript-eslint/no-explicit-any*/
    /*eslint-disable @typescript-eslint/no-unsafe-member-access*/
    const onDragStart = (event: any, nodeType: string): void => {
        setService!(nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <Box textAlign="center" marginTop={8} marginRight={5}>
            <Typography component="span" sx={{ fontSize: "1.2em" }}>
                Available services
            </Typography>
            {google.googleToken && (
                <>
                    <Box onDragStart={(event) => onDragStart(event, "GCalendar")} draggable>
                        <CalendarNode />
                    </Box>
                    <Box onDragStart={(event) => onDragStart(event, "Gmail")} draggable>
                        <GmailNode />
                    </Box>
                </>
            )}
            <Box onDragStart={(event) => onDragStart(event, "Pastebin")} draggable>
                <PastebinNode />
            </Box>
            {!google.googleToken && (
                <>
                    <Typography component="span" sx={{ fontSize: "1.2em" }} data-cy="typo-unavailable-services-workflow">
                        Unavailable services
                    </Typography>

                    <Box>
                        <CalendarNode disabled />
                    </Box>
                    <Box>
                        <GmailNode disabled />
                    </Box>
                </>
            )}
        </Box>
    );
};

export default WorkflowSidebar;

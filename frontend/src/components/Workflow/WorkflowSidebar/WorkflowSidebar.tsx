import { useGoogleToken } from "../../../hooks/useGoogleToken";
import { CalendarNode } from "../../Nodes/CalendarNode/CalendarNode";
import { GmailNode } from "../../Nodes/GmailNode/GmailNode";
import { PastebinNode } from "../../Nodes/PastebinNode/PastebinNode";
import { useDnD } from "../DndContext/DnDContext";
import { Box, Typography } from "@mui/material";

const WorkflowSidebar = () => {
    const [, setService] = useDnD();
    const google = useGoogleToken();

    const onDragStart = (event: any, nodeType: string) => {
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
                    <Typography component="span" sx={{ fontSize: "1.2em" }}>
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

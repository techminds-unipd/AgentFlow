import { CustomNode, CustomNodeProps } from "../CustomNode/CustomNode.tsx";

export const CalendarNode = ({
    nodeTitle = "Calendar",
    dialogContent = "Descrizione calendar blablabla",
    type = "in-out",
    disabled = false,
    draggable = false}: CustomNodeProps) => {

  return <CustomNode nodeTitle={nodeTitle} dialogContent={dialogContent} draggable={draggable} disabled={disabled} type={type}/>;
}
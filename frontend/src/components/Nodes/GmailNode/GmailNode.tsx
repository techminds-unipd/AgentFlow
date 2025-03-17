import { CustomNode, CustomNodeProps } from "../CustomNode/CustomNode.tsx";

export const GmailNode = ({
    nodeTitle = "Gmail",
    dialogContent = "Descrizione Gmail blablabla",
    type = "in-out",
    disabled = false,
    draggable = false}: CustomNodeProps) => {

  return <CustomNode nodeTitle={nodeTitle} dialogContent={dialogContent} draggable={draggable} disabled={disabled} type={type}/>;
}
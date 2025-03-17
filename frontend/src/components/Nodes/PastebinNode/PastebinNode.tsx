import "../CustomNode/CustomNode.tsx";
import { CustomNode, CustomNodeProps } from "../CustomNode/CustomNode.tsx";

export const PastebinNode = ({
    nodeTitle = "Pastebin",
    dialogContent = "Descrizione Pastebin blablabla",
    type = "in",
    disabled = false,
    draggable = false}: CustomNodeProps) => {
        
  return <CustomNode nodeTitle={nodeTitle} dialogContent={dialogContent} draggable={draggable} disabled={disabled} type={type}/>;
};
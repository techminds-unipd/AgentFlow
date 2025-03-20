import { CalendarNode } from '../../Nodes/CalendarNode/CalendarNode';
import { GmailNode } from '../../Nodes/GmailNode/GmailNode';
import { PastebinNode } from '../../Nodes/PastebinNode/PastebinNode';
import { useDnD } from '../DndContext/DnDContext';
import "./WorkflowSidebar.css";

const WorkflowSidebar = () => {
  const [, setService] = useDnD();

  const onDragStart = (event: any, nodeType: string) => {
    setService!(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      Available services
      <div onDragStart={(event) => onDragStart(event, "Calendar")} draggable>
        <CalendarNode />
      </div>
      <div onDragStart={(event) => onDragStart(event, "Gmail")} draggable>
        <GmailNode />
      </div>
      <div onDragStart={(event) => onDragStart(event, "Pastebin")} draggable>
        <PastebinNode />
      </div>
    </aside>
  );
};

export default WorkflowSidebar;

import {
    Node,
    Edge,
    OnEdgesChange,
    OnNodesChange,
    ReactFlow,
    MarkerType,
    addEdge,
    useReactFlow,
    Position,
    getOutgoers,
    ConnectionLineType,
    Controls,
    Background,
    BackgroundVariant
} from "@xyflow/react";
import { JSX, useCallback, useRef } from "react";
import { useDnD } from "../DndContext/DnDContext";
import EditableEdge from "../EditableEdge/EditableEdge";
import "@xyflow/react/dist/style.css";
import { DeletableNode } from "../DeletableNode/DeletableNode";
import { DeletableOutputNode } from "../DeletableNode/DeletableOutputNode";

interface WorkflowCanvasProps {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange<Node>;
    onEdgesChange: OnEdgesChange<Edge>;
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

const edgeTypes = { editable: EditableEdge };
const nodeTypes = { deletable: DeletableNode, deletableOutput: DeletableOutputNode };

export const WorkflowCanvas = ({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    setNodes,
    setEdges
}: WorkflowCanvasProps): JSX.Element => {
    const reactFlowWrapper = useRef(null);
    const { screenToFlowPosition } = useReactFlow();
    const [nodeService] = useDnD();
    const { getNodes, getEdges } = useReactFlow();
    let nodeId = nodes.length;
    let edgeId = edges.length;

    /*eslint-disable @typescript-eslint/explicit-function-return-type*/
    /*eslint-disable @typescript-eslint/no-unsafe-return*/
    /*eslint-disable @typescript-eslint/no-explicit-any*/
    const onConnect = useCallback(
        (params: any) => {
            const getEdgeId = () => edgeId++;
            setEdges((eds) =>
                addEdge(
                    {
                        ...params,
                        markerEnd: { type: MarkerType.ArrowClosed },
                        type: "editable",
                        label: "Insert your automation",
                        id: getEdgeId()
                    },
                    eds
                )
            );
        },
        [edgeId, setEdges]
    );

    /*eslint-disable @typescript-eslint/no-unsafe-call*/
    /*eslint-disable @typescript-eslint/no-unsafe-member-access*/
    /*eslint-disable @typescript-eslint/no-explicit-any*/
    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event: any) => {
            const getNodeId = () => nodeId++;
            event.preventDefault();

            // check if the dropped element is valid
            if (!nodeService) return;

            /*eslint-disable @typescript-eslint/no-unsafe-assignment*/
            const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
            const newNode: Node = {
                id: String(getNodeId()),
                position,
                data: { label: nodeService },
                sourcePosition: "right" as Position,
                targetPosition: "left" as Position,
                type: "deletable"
            };
            if (newNode.data.label === "Pastebin") newNode.type = "deletableOutput";
            setNodes((nds: Node[]) => nds.concat(newNode));
        },
        [screenToFlowPosition, nodeService, setNodes, nodeId]
    );

    // https://reactflow.dev/examples/interaction/prevent-cycles
    const isValidConnection = useCallback(
        (connection: any) => {
            // we are using getNodes and getEdges helpers here
            // to make sure we create isValidConnection function only once
            const nodes = getNodes();
            const edges = getEdges();
            const target = nodes.find((node: Node) => node.id === connection.target);
            const hasCycle = (node: Node, visited = new Set()) => {
                if (visited.has(node.id)) return false;

                visited.add(node.id);

                for (const outgoer of getOutgoers(node, nodes, edges)) {
                    if (outgoer.id === connection.source) return true;
                    if (hasCycle(outgoer, visited)!) return true;
                }
            };

            if (target && target.id === connection.source) return false;
            return !hasCycle(target as Node)!;
        },
        [getNodes, getEdges]
    );

    return (
        <div ref={reactFlowWrapper} style={{ width: "100%", height: "75vh" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                edgeTypes={edgeTypes}
                nodeTypes={nodeTypes}
                fitView
                style={{ backgroundColor: "white", border: "solid black 0.2em" }}
                connectionLineType={ConnectionLineType.Bezier}
                isValidConnection={isValidConnection}
                minZoom={0.5}
                data-cy="workflow-canvas"
            >
                <Background color="rgb(242,242,242)" variant={BackgroundVariant.Lines} />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};

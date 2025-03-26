import { expect, test, describe, beforeEach, vi } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import { AuthContextType, MockedAuthProvider, providerPropsInit } from "../context/MockedAuthProvider";
import "@testing-library/jest-dom";
import { useGetWorkflow } from "./useGetWorkflow";
import { WorkflowDTO } from "../services/dto/WorkflowDTO";
import { JSX, useState } from "react";

describe("useGetWorkflow hook", () => {
    let providerProps: AuthContextType;
    const workflowMock = new WorkflowDTO("workflow", [], []);
    const getWorkflowService = { getWorkflow: vi.fn() };

    beforeEach(() => {
        providerProps = providerPropsInit();
    });

    const TestComponent = ({ workflowName }: { workflowName: string }): JSX.Element => {
        getWorkflowService.getWorkflow.mockResolvedValue(workflowMock);
        const getWorkflow = useGetWorkflow(getWorkflowService);
        const [workflow, setWorkflow] = useState<WorkflowDTO>();

        const handleGet = async (): Promise<void> => {
            setWorkflow(await getWorkflow(workflowName));
        };

        return (
            <div>
                <p>Workflow: {JSON.stringify(workflow)}</p>
                <button onClick={() => void handleGet()}>Get Workflow</button>
            </div>
        );
    };

    test("Get a workflow successfully when user is authenticated", async () => {
        render(
            <MockedAuthProvider {...providerProps}>
                <TestComponent workflowName="Test Workflow" />
            </MockedAuthProvider>
        );

        act(() => {
            screen.getByText("Get Workflow").click();
        });
        await waitFor(() => {
            expect(screen.getByText(/Workflow: {"name":"workflow","nodes":\[\],"edges":\[\]}/)).toBeInTheDocument();
        });
    });
});

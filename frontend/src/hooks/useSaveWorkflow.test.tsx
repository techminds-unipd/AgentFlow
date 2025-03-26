import { expect, test, describe, beforeEach, vi } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import { AuthContextType, MockedAuthProvider, providerPropsInit } from "../context/MockedAuthProvider";
import "@testing-library/jest-dom";
import { WorkflowDTO } from "../services/dto/WorkflowDTO";
import { JSX, useState } from "react";
import { useSaveWorkflow } from "./useSaveWorkflow";

describe("useSaveWorkflow hook", () => {
    let providerProps: AuthContextType;
    const workflowMock = new WorkflowDTO("workflow", [], []);
    const saveWorkflowService = { saveWorkflow: vi.fn() };

    beforeEach(() => {
        providerProps = providerPropsInit();
    });

    const TestComponent = ({ workflowDto }: { workflowDto: WorkflowDTO }): JSX.Element => {
        saveWorkflowService.saveWorkflow.mockResolvedValue(workflowMock);
        const saveWorkflow = useSaveWorkflow(saveWorkflowService);
        const [workflow, setWorkflow] = useState<WorkflowDTO>();

        const handleSave = async (): Promise<void> => {
            setWorkflow(await saveWorkflow(workflowDto));
        };

        return (
            <div>
                <p>Saved Workflow: {JSON.stringify(workflow)}</p>
                <button onClick={() => void handleSave()}>Save Workflow</button>
            </div>
        );
    };

    test("Get a workflow successfully after saving", async () => {
        render(
            <MockedAuthProvider {...providerProps}>
                <TestComponent workflowDto={workflowMock} />
            </MockedAuthProvider>
        );

        act(() => {
            screen.getByText("Save Workflow").click();
        });
        await waitFor(() => {
            expect(screen.getByText(/Saved Workflow: {"name":"workflow","nodes":\[\],"edges":\[\]}/)).toBeInTheDocument();
        });
    });
});

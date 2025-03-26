import { expect, test, describe, beforeEach, vi } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import { AuthContextType, MockedAuthProvider, providerPropsInit } from "../context/MockedAuthProvider";
import "@testing-library/jest-dom";
import { WorkflowDTO } from "../services/dto/WorkflowDTO";
import { JSX, useState } from "react";
import { useExecuteWorkflow } from "./useExecuteWorkflow";
import { googleProviderPropsInit, MockedGoogleTokenProvider } from "../context/MockedGoogleTokenProvider";
import { GoogleAccountTokenType } from "../context/GoogleTokenContext";

describe("useExecuteWorkflow hook", () => {
    let providerAuthProps: AuthContextType;
    let providerGoogleProps: GoogleAccountTokenType;

    const workflow = new WorkflowDTO("workflow", [], []);
    const executeWorkflowService = { executeWorkflow: vi.fn() };

    beforeEach(() => {
        providerAuthProps = providerPropsInit();
        providerGoogleProps = googleProviderPropsInit();
    });

    const TestComponent = ({ workflowDto }: { workflowDto: WorkflowDTO }): JSX.Element => {
        executeWorkflowService.executeWorkflow.mockResolvedValue("Ciao");
        const executeWorkflow = useExecuteWorkflow(executeWorkflowService);
        const [agentResponse, setAgentResponse] = useState<string>();

        const handleExecute = async (): Promise<void> => {
            setAgentResponse(await executeWorkflow(workflowDto));
        };

        return (
            <div>
                <p>Agent response: {agentResponse}</p>
                <button onClick={() => void handleExecute()}>Execute Workflow</button>
            </div>
        );
    };

    test("Get agent response successfully after execute a worklow", async () => {
        render(
            <MockedAuthProvider {...providerAuthProps}>
                <MockedGoogleTokenProvider {...providerGoogleProps}>
                    <TestComponent workflowDto={workflow} />
                </MockedGoogleTokenProvider>
            </MockedAuthProvider>
        );

        act(() => {
            screen.getByText("Execute Workflow").click();
        });
        await waitFor(() => {
            expect(screen.getByText(/Agent response: Ciao/)).toBeInTheDocument();
        });
    });
});

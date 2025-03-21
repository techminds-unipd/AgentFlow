import { expect, test, describe, beforeEach, vi } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import { AuthContextType, MockedAuthProvider, providerPropsInit } from "../context/MockedAuthProvider";
import { NewWorkflowService } from "../services/newWorkflowService";
import { useCreateWorkflow } from "./useCreateWorkflow";
import "@testing-library/jest-dom";

describe("useCreateWorkflow hook", () => {
    let providerProps: AuthContextType;

    beforeEach(() => {
        providerProps = providerPropsInit();
        vi.restoreAllMocks();
    });

    const TestComponent = ({ workflowName }: { workflowName: string }) => {
        const { createWorkflow, isLoading, error } = useCreateWorkflow();

        const handleCreate = async () => {
            await createWorkflow(workflowName);
        };

        return (
            <div>
                <p>Loading: {JSON.stringify(isLoading)}</p>
                <p>Error: {JSON.stringify(error)}</p>
                <button onClick={handleCreate}>Create Workflow</button>
            </div>
        );
    };

    test("Creates workflow successfully when user is authenticated", async () => {
        vi.spyOn(NewWorkflowService.prototype, "newWorkflow").mockResolvedValue({ name: "Workflow Created" });

        render(<MockedAuthProvider {...providerProps}><TestComponent workflowName="Test Workflow" /></MockedAuthProvider>);

        expect(screen.getByText(/Loading: false/i)).toBeInTheDocument();
        act(()=>{
            screen.getByText("Create Workflow").click();
        })
        await waitFor(() => {
            expect(screen.getByText(/Loading: false/i)).toBeInTheDocument();
            expect(screen.getByText(/Error: null/i)).toBeInTheDocument();
        });
    });

    test("Handles errors when API call fails", async () => {
        vi.spyOn(NewWorkflowService.prototype, "newWorkflow").mockRejectedValue(new Error("API Error"));

        render(<MockedAuthProvider {...providerProps}><TestComponent workflowName="Failing Workflow" /></MockedAuthProvider>);

        expect(screen.getByText(/Loading: false/i)).toBeInTheDocument();
        act(()=>{
            screen.getByText("Create Workflow").click();
        })
        await waitFor(() => {
            expect(screen.getByText(/Loading: false/i)).toBeInTheDocument();
            expect(screen.getByText(/Error: "API Error"/i)).toBeInTheDocument();
        });
    });

    test("Throws an error when useCreateWorkflow is used outside AuthProvider", () => {
        expect(() => render(<TestComponent workflowName="Outside Workflow" />)).toThrowError();
    });
});
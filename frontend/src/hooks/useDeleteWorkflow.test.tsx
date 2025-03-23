import { expect, test, describe, beforeEach, vi } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import { AuthContextType, MockedAuthProvider, providerPropsInit } from "../context/MockedAuthProvider";
import { useDeleteWorkflow } from "./useDeleteWorkflow";
import { DeleteWorkflowService } from "../services/deleteWorkflowService";
import "@testing-library/jest-dom";
import { JSX } from "react";

describe("useDeleteWorkflow hook", () => {
    let providerProps: AuthContextType;

    beforeEach(() => {
        providerProps = providerPropsInit();
    });

    const TestComponent = ({ workflowName }: { workflowName: string }): JSX.Element => {
        const { deleteWorkflow, isLoading, error } = useDeleteWorkflow();

        const handleDelete = async (): Promise<void> => {
            await deleteWorkflow(workflowName);
        };

        return (
            <div>
                <p>Loading: {JSON.stringify(isLoading)}</p>
                <p>Error: {JSON.stringify(error)}</p>
                <button onClick={() => void handleDelete()}>Delete Workflow</button>
            </div>
        );
    };

    test("Deletes a workflow successfully when user is authenticated", async () => {
        vi.spyOn(DeleteWorkflowService.prototype, "deleteWorkflowByName").mockResolvedValue({ name: "Deleted Successfully" });

        render(
            <MockedAuthProvider {...providerProps}>
                <TestComponent workflowName="Test Workflow" />
            </MockedAuthProvider>
        );

        expect(screen.getByText(/Loading: false/i)).toBeInTheDocument();
        act(() => {
            screen.getByText("Delete Workflow").click();
        });
        await waitFor(() => {
            expect(screen.getByText(/Loading: false/i)).toBeInTheDocument();
            expect(screen.getByText(/Error: null/i)).toBeInTheDocument();
        });
    });

    test("Handles errors when API call fails", async () => {
        vi.spyOn(DeleteWorkflowService.prototype, "deleteWorkflowByName").mockRejectedValue(new Error("API Error"));

        render(
            <MockedAuthProvider {...providerProps}>
                <TestComponent workflowName="Failing Workflow" />
            </MockedAuthProvider>
        );

        expect(screen.getByText(/Loading: false/i)).toBeInTheDocument();
        act(() => {
            screen.getByText("Delete Workflow").click();
        });
        await waitFor(() => {
            expect(screen.getByText(/Loading: false/i)).toBeInTheDocument();
            expect(screen.getByText(/Error: "API Error"/i)).toBeInTheDocument();
        });
    });

    test("Throws an error when useDeleteWorkflow is used outside AuthProvider", () => {
        expect(() => render(<TestComponent workflowName="Outside Workflow" />)).toThrowError();
    });
});

import { expect, test, describe, beforeEach, vi } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import { AuthContextType, MockedAuthProvider, providerPropsInit } from "../context/MockedAuthProvider";
import { useDeleteWorkflow } from "./useDeleteWorkflow";
import { DeleteWorkflowService } from "../services/DeleteWorkflowService";
import "@testing-library/jest-dom";
import { JSX } from "react";

describe("useDeleteWorkflow hook", () => {
    let providerProps: AuthContextType;
    let mockDeleteWorkflowService: DeleteWorkflowService;

    beforeEach(() => {
        providerProps = providerPropsInit();

        mockDeleteWorkflowService = {
            deleteWorkflowByName: vi.fn().mockResolvedValue("Deleted Successfully")
        } as unknown as DeleteWorkflowService;
    });

    const TestComponent = ({ workflowName, service }: { workflowName: string; service: DeleteWorkflowService }): JSX.Element => {
        const { deleteWorkflow, isLoading, error } = useDeleteWorkflow(service);

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

    test("TUF46 - Deletes a workflow successfully when user is authenticated", async () => {
        mockDeleteWorkflowService.deleteWorkflowByName = vi.fn().mockResolvedValue("Deleted Successfully");

        render(
            <MockedAuthProvider {...providerProps}>
                <TestComponent workflowName="Test Workflow" service={mockDeleteWorkflowService} />
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

    test("TUF47 - Handles errors when API call fails", async () => {
        mockDeleteWorkflowService.deleteWorkflowByName = vi.fn().mockRejectedValue(new Error("API Error"));

        render(
            <MockedAuthProvider {...providerProps}>
                <TestComponent workflowName="Failing Workflow" service={mockDeleteWorkflowService} />
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

    test("TUF48 - Throws an error when useDeleteWorkflow is used outside AuthProvider", () => {
        expect(() =>
            render(<TestComponent workflowName="Outside Workflow" service={mockDeleteWorkflowService} />)
        ).toThrowError();
    });
});

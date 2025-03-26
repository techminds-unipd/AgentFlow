import { expect, test, describe, beforeEach, vi } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import { AuthContextType, MockedAuthProvider, providerPropsInit } from "../context/MockedAuthProvider";
import { CreateWorkflowService } from "../services/CreateWorkflowService";
import { useCreateWorkflow } from "./useCreateWorkflow";
import "@testing-library/jest-dom";
import { JSX } from "react";

describe("useCreateWorkflow hook", () => {
    let providerProps: AuthContextType;
    let mockCreateWorkflowService: CreateWorkflowService;
    

    beforeEach(() => {
        providerProps = providerPropsInit();
        vi.restoreAllMocks();

        mockCreateWorkflowService = {
            newWorkflow: vi.fn().mockResolvedValue("Workflow Created"),
        } as unknown as CreateWorkflowService;
    });

    const TestComponent = ({ workflowName, service }: { workflowName: string, service: CreateWorkflowService }): JSX.Element => {
        const { createWorkflow, isLoading, error } = useCreateWorkflow(service);

        const handleCreate = async (): Promise<void> => {
            await createWorkflow(workflowName);
        };

        return (
            <div>
                <p>Loading: {JSON.stringify(isLoading)}</p>
                <p>Error: {JSON.stringify(error)}</p>
                <button onClick={() => void handleCreate()}>Create Workflow</button>
            </div>
        );
    };

    test("Creates workflow successfully when user is authenticated", async () => {
        mockCreateWorkflowService.newWorkflow = vi.fn().mockResolvedValue("Workflow Created");

        render(
            <MockedAuthProvider {...providerProps}>
                <TestComponent workflowName="Test Workflow" service={mockCreateWorkflowService} />
            </MockedAuthProvider>
        );

        expect(screen.getByText(/Loading: false/i)).toBeInTheDocument();
        act(() => {
            screen.getByText("Create Workflow").click();
        });
        await waitFor(() => {
            expect(screen.getByText(/Loading: false/i)).toBeInTheDocument();
            expect(screen.getByText(/Error: null/i)).toBeInTheDocument();
        });
    });

    test("Handles errors when API call fails", async () => {
        mockCreateWorkflowService.newWorkflow = vi.fn().mockRejectedValue(new Error("API Error"));

        render(
            <MockedAuthProvider {...providerProps}>
                <TestComponent workflowName="Failing Workflow" service={mockCreateWorkflowService} />
            </MockedAuthProvider>
        );

        expect(screen.getByText(/Loading: false/i)).toBeInTheDocument();
        act(() => {
            screen.getByText("Create Workflow").click();
        });
        await waitFor(() => {
            expect(screen.getByText(/Loading: false/i)).toBeInTheDocument();
            expect(screen.getByText(/Error: "API Error"/i)).toBeInTheDocument();
        });
    });

    test("Throws an error when useCreateWorkflow is used outside AuthProvider", () => {
        expect(() => render(<TestComponent workflowName="Outside Workflow" service={mockCreateWorkflowService} />)).toThrowError();
    });
});

import { expect, test, describe, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { AuthContextType, MockedAuthProvider, providerPropsInit } from "../context/MockedAuthProvider";
import { AllWorkflowsService } from "../services/AllWorkflowsService";
import { useAllWorkflow } from "./useAllWorkflows";
import "@testing-library/jest-dom";
import { JSX } from "react";

describe("useAllWorkflow hook", () => {
    let providerProps: AuthContextType;
    let mockAllWorkflowsService: AllWorkflowsService;

    beforeEach(() => {
        providerProps = providerPropsInit();

        mockAllWorkflowsService = {
            allWorkflows: vi.fn().mockResolvedValue(["workflow1", "workflow2"])
        } as unknown as AllWorkflowsService;
    });

    const TestComponent = ({ service }: { service: AllWorkflowsService }): JSX.Element => {
        const { workflowList, isLoading, error, refetch } = useAllWorkflow(service);

        return (
            <div>
                <p>Loading: {JSON.stringify(isLoading)}</p>
                <p>Workflows: {JSON.stringify(workflowList)}</p>
                <p>Error: {JSON.stringify(error)}</p>
                <button onClick={() => void refetch}>Fetch Workflows</button>
            </div>
        );
    };

    test("Fetches workflow list when user is authenticated", async () => {
        const mockData = ["workflow1", "workflow2"];
        mockAllWorkflowsService.allWorkflows = vi.fn().mockResolvedValue(mockData);

        render(
            <MockedAuthProvider {...providerProps}>
                <TestComponent service={mockAllWorkflowsService} />
            </MockedAuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Loading: false/i)).toBeInTheDocument();
            expect(screen.getByText(/Workflows: \["workflow1","workflow2"\]/i)).toBeInTheDocument();
            expect(screen.getByText(/Error: null/i)).toBeInTheDocument();
        });
    });

    test("Handles errors when API call fails", async () => {
        mockAllWorkflowsService.allWorkflows = vi.fn().mockRejectedValue(new Error("API Error"));

        render(
            <MockedAuthProvider {...providerProps}>
                <TestComponent service={mockAllWorkflowsService} />
            </MockedAuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Loading: false/i)).toBeInTheDocument();
            expect(screen.getByText(/Workflows: null/i)).toBeInTheDocument();
            expect(screen.getByText(/Error: "API Error"/i)).toBeInTheDocument();
        });
    });

    test("Throws an error when useAllWorkflow is used outside AuthProvider", () => {
        expect(() => render(<TestComponent service={mockAllWorkflowsService} />)).toThrowError();
    });
});

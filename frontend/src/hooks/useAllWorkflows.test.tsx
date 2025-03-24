import { expect, test, describe, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { AuthContextType, MockedAuthProvider, providerPropsInit } from "../context/MockedAuthProvider";
import { AllWorkflowsService } from "../services/allWorkflowsService";
import { useAllWorkflow } from "./useAllWorkflows";
import "@testing-library/jest-dom";
import { JSX } from "react";

describe("useAllWorkflow hook", () => {
    let providerProps: AuthContextType;

    beforeEach(() => {
        providerProps = providerPropsInit();
    });

    const TestComponent = (): JSX.Element => {
        const { workflowList, isLoading, error, refetch } = useAllWorkflow();

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
        vi.spyOn(AllWorkflowsService.prototype, "allWorkflows").mockResolvedValue(mockData);

        render(
            <MockedAuthProvider {...providerProps}>
                <TestComponent />
            </MockedAuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Loading: false/i)).toBeInTheDocument();
            expect(screen.getByText(/Workflows: \["workflow1","workflow2"\]/i)).toBeInTheDocument();
            expect(screen.getByText(/Error: null/i)).toBeInTheDocument();
        });
    });

    test("Handles errors when API call fails", async () => {
        vi.spyOn(AllWorkflowsService.prototype, "allWorkflows").mockRejectedValue(new Error("API Error"));

        render(
            <MockedAuthProvider {...providerProps}>
                <TestComponent />
            </MockedAuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Loading: false/i)).toBeInTheDocument();
            expect(screen.getByText(/Workflows: null/i)).toBeInTheDocument();
            expect(screen.getByText(/Error: "API Error"/i)).toBeInTheDocument();
        });
    });

    test("Throws an error when useAllWorkflow is used outside AuthProvider", () => {
        expect(() => render(<TestComponent />)).toThrowError();
    });
});

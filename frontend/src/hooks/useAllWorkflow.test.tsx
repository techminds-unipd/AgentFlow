import { expect, test, describe, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAllWorkflow } from "./useAllWorkflow";
import { AuthContext } from "../context/AuthContext";
import { AuthContextType, providerPropsInit } from "../context/MockedAuthProvider";
import { allWorkflow } from "../services/allWorkflowAPI";

vi.mock("../services/allWorkflowAPI", () => ({
    allWorkflow: vi.fn()
}));

describe("useAllWorkflow hook", () => {
    let providerProps: AuthContextType;

    beforeEach(() => {
        providerProps = providerPropsInit();
    });

    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthContext.Provider value={providerProps}>{children}</AuthContext.Provider>
    );

    test("Fetches workflow list when user is authenticated", async () => {
        const mockData = ["workflow1", "workflow2"];
        vi.mocked(allWorkflow).mockResolvedValue(mockData);

        const { result } = renderHook(() => useAllWorkflow(), { wrapper: Wrapper });

        expect(result.current.isLoading).toBe(true);

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.workflowList).toEqual(mockData);
        expect(result.current.error).toBeNull();
    });

    test("Handles errors when API call fails", async () => {
        vi.mocked(allWorkflow).mockRejectedValue(new Error("API Error")); // Fix applied

        const { result } = renderHook(() => useAllWorkflow(), { wrapper: Wrapper });

        expect(result.current.isLoading).toBe(true);

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.workflowList).toBeNull();
        expect(result.current.error).toBe("API Error");
    });

    test("Throws an error when useAllWorkflow is used outside AuthProvider", () => {
        expect(() => renderHook(() => useAllWorkflow())).toThrowError();
    });
});

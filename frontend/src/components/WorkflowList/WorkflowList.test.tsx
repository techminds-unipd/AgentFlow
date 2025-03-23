import { screen, render } from "@testing-library/react";
import { vi, describe, test, expect, beforeEach } from "vitest";
import { WorkflowList } from "./WorkflowList";
import { useAllWorkflow } from "../../hooks/useAllWorkflows";
import { AuthContextType, MockedAuthProvider, providerPropsInit} from "../../context/MockedAuthProvider"
import "@testing-library/jest-dom";

vi.mock("../../hooks/useAllWorkflows");

describe("WorkflowList Component", () => {
  const mockSetShouldReload = vi.fn();
  let providerProps: AuthContextType;


  beforeEach(() => {
    vi.clearAllMocks();
    providerProps=providerPropsInit();
  });

  test("Displays workflows correctly", async () => {
    const mockWorkflows: string[] = ["Workflow 1", "Workflow 2", "Workflow 3"];

    vi.mocked(useAllWorkflow).mockReturnValue({
      workflowList: mockWorkflows,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<MockedAuthProvider {...providerProps}><WorkflowList shouldReload={false} setShouldReload={mockSetShouldReload} /></MockedAuthProvider>);

    mockWorkflows.forEach((workflow) => {
      expect(screen.getByText(workflow)).toBeInTheDocument();
    });
  });

  test("Calls refetch when shouldReload is true", () => {
    const mockRefetch = vi.fn();

    const mockWorkflows: string[] = ["Workflow 1"];

    vi.mocked(useAllWorkflow).mockReturnValue({
      workflowList: mockWorkflows,
      isLoading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<MockedAuthProvider {...providerProps}><WorkflowList shouldReload={true} setShouldReload={mockSetShouldReload} /></MockedAuthProvider>);

    expect(mockRefetch).toHaveBeenCalled();
  });
});
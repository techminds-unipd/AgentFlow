import { render, screen } from "@testing-library/react";
import { vi, describe, test, expect, beforeEach } from "vitest";
import { WorkflowList } from "./WorkflowList";
import { useAllWorkflow } from "../../hooks/useAllWorkflow";

// Mock the `useAllWorkflow` hook
vi.mock("../../hooks/useAllWorkflow");

describe("WorkflowList Component", () => {
  const mockSetShouldReload = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Displays workflows correctly", async () => {
    const mockWorkflows: string[] = ["Workflow 1", "Workflow 2", "Workflow 3"];

    vi.mocked(useAllWorkflow).mockReturnValue({
      workflowList: mockWorkflows,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<WorkflowList shouldReload={false} setShouldReload={mockSetShouldReload} />);

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

    render(<WorkflowList shouldReload={true} setShouldReload={mockSetShouldReload} />);

    expect(mockRefetch).toHaveBeenCalled();
  });
});
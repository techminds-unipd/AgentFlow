import { fireEvent, render, screen } from "@testing-library/react";
import { vi, describe, test, beforeEach, expect } from "vitest";
import { AddWorkflow } from "./AddWorkflow";
import { useCreateWorkflow } from "../../hooks/useCreateWorkflow";
import "@testing-library/jest-dom";

vi.mock("../../hooks/useCreateWorkflow");

describe("AddWorkflow Component", () => {
    const mockSetShouldReload = vi.fn();
    const mockCreateWorkflow = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useCreateWorkflow).mockReturnValue({ createWorkflow: mockCreateWorkflow, isLoading: false, error: null });
    });

    test("Handles input change", () => {
        render(<AddWorkflow setShouldReload={mockSetShouldReload} />);
        const input = screen.getByPlaceholderText("Insert workflow name");
        fireEvent.change(input, { target: { value: "Test Workflow" } });
        expect(input).toHaveValue("Test Workflow");
    });

    test("Shows error message when trying to add an empty workflow", async () => {
        render(<AddWorkflow setShouldReload={mockSetShouldReload} />);
        const button = screen.getByRole("button", { name: /add workflow/i });
        fireEvent.click(button);
        //await userEvent.click(button);
        expect(await screen.findByText("Please enter a valid workflow name.")).toBeInTheDocument();
    });

    test("Calls createWorkflow on valid input", async () => {
        mockCreateWorkflow.mockResolvedValue({ name: "Test Workflow" });

        render(<AddWorkflow setShouldReload={mockSetShouldReload} />);
        const input = screen.getByPlaceholderText("Insert workflow name");
        const button = screen.getByRole("button", { name: /add workflow/i });
        fireEvent.change(input, { target: { value: "Test Workflow" } });
        fireEvent.click(button);

        expect(mockCreateWorkflow).toHaveBeenCalledWith("Test Workflow");
        expect(await screen.findByText('Workflow "Test Workflow" created successfully.')).toBeInTheDocument();
    });

    test("Shows if error message is displayed if workflow already exists", async () => {
        const errorMessage = "Workflow with the same name already exists";

        vi.mocked(useCreateWorkflow).mockReturnValue({ createWorkflow: vi.fn(), isLoading: false, error: errorMessage });

        render(<AddWorkflow setShouldReload={mockSetShouldReload} />);

        const input = screen.getByPlaceholderText("Insert workflow name");
        const button = screen.getByRole("button", { name: /add workflow/i });

        fireEvent.change(input, { target: { value: "Prova" } });
        fireEvent.click(button);

        expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    });
});

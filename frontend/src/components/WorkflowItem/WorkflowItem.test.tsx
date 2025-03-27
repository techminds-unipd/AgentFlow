import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { WorkflowItem } from "./WorkflowItem";
import { useDeleteWorkflow } from "../../hooks/useDeleteWorkflow";
import { vi, describe, test, expect } from "vitest";
import "@testing-library/jest-dom";
import { DeleteWorkflowService } from "../../services/DeleteWorkflowService";

// Mock the `useDeleteWorkflow` hook
vi.mock("../../hooks/useDeleteWorkflow", () => ({ useDeleteWorkflow: vi.fn().mockReturnValue({ deleteWorkflow: vi.fn() }) }));

describe("WorkflowItem", () => {
    const setShouldReload = vi.fn();
    const setAlertColor = vi.fn();
    const setSnackBarSetMessage = vi.fn();
    const setOpenSnackBar = vi.fn();

    test("Opens the dialog when clicking the delete button", () => {
        render(<WorkflowItem name="Test Workflow" setShouldReload={setShouldReload} setAlertColor={setAlertColor} setSnackBarSetMessage={setSnackBarSetMessage} setOpenSnackBar={setOpenSnackBar}/>);

        const deleteButton = screen.getByRole("button");
        fireEvent.click(deleteButton);

        expect(screen.getByText("Are you sure you want to delete your workflow?")).toBeInTheDocument();
    });

    test("Closes the dialog when clicking the delete button", async () => {
        render(<WorkflowItem name="Test Workflow" setShouldReload={setShouldReload} setAlertColor={setAlertColor} setSnackBarSetMessage={setSnackBarSetMessage} setOpenSnackBar={setOpenSnackBar}/>);

        const deleteButton = screen.getByRole("button");
        fireEvent.click(deleteButton);

        const noButton = screen.getByText("No");
        fireEvent.click(noButton);

        await waitFor(() => {
            expect(screen.queryByText("Are you sure you want to delete your workflow?")).toBeNull();
        });
    });

    test("Calls deleteWorkflow when clicking 'Yes' on the dialog", async () => {
        const { deleteWorkflow } = useDeleteWorkflow(new DeleteWorkflowService());

        render(<WorkflowItem name="Test Workflow" setShouldReload={setShouldReload} setAlertColor={setAlertColor} setSnackBarSetMessage={setSnackBarSetMessage} setOpenSnackBar={setOpenSnackBar}/>);

        const deleteButton = screen.getByRole("button");
        fireEvent.click(deleteButton);

        const yesButton = screen.getByText("Yes");
        fireEvent.click(yesButton);

        await waitFor(() => {
            expect(deleteWorkflow).toHaveBeenCalledWith("Test Workflow");
        });
    });
});

import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import { CustomNode } from "./CustomNode";

describe("CustomNode", () => {
    test("Renders open dialog if the custom button is clicked", () => {
        render(<CustomNode />);

        const customNode = screen.getByRole("button");
        expect(screen.queryByRole("dialog")).toBeNull();
        fireEvent.click(customNode);
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    test("Renders close dialog if 'Close' button is clicked", async () => {
        render(<CustomNode />);

        const customNode = screen.getByRole("button");
        fireEvent.click(customNode);
        fireEvent.click(screen.getByRole("button", { name: /Close/i }));
        await waitFor(() => {
            expect(screen.queryByRole("dialog")).toBeNull();
        });
    });

    test("Test if a draggable custom node is draggable", () => {
        render(<CustomNode draggable />);

        const customNode = screen.getByRole("button");
        expect(customNode).toHaveAttribute("draggable", "true");
    });

    test("Test if a not draggable custom node is not draggable", () => {
        render(<CustomNode />);

        const customNode = screen.getByRole("button");
        expect(customNode).toHaveAttribute("draggable", "false");
    });
});

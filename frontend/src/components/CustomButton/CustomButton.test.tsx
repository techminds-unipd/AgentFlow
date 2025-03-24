import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router";
import { CustomButton } from "./CustomButton";

describe("CustomButton", () => {
    const buttonLink = "/test";
    const buttonText = "Button Name";

    test("Renders button with correct text", () => {
        render(
            <MemoryRouter>
                <CustomButton name={buttonText} link={buttonLink} variant="contained" />
            </MemoryRouter>
        );

        expect(screen.getByRole("link", { name: buttonText })).toBeInTheDocument();
    });

    test("Rendered button has the correct link", () => {
        render(
            <MemoryRouter>
                <CustomButton name={buttonText} link={buttonLink} variant="contained" />
            </MemoryRouter>
        );

        expect(screen.getByRole("link", { name: buttonText })).toHaveAttribute("href", buttonLink);
    });

    test("Navigates to the correct page on button click", async () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/" element={<CustomButton name={buttonText} link={buttonLink} variant="contained" />} />
                    <Route path={buttonLink} element={<div>Test Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        const button = screen.getByRole("link", { name: buttonText });
        await userEvent.click(button);
        expect(screen.getByText("Test Page")).toBeInTheDocument();
    });
});

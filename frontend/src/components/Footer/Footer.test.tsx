import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import {expect, test, describe} from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
    test("Renders the GitHub link in footer", () => {
        render(<Footer/>)
        expect(screen.getByRole("link")).toBeInTheDocument()
        expect(screen.getByRole("link")).toHaveTextContent("GitHub repository")
        expect(screen.getByRole("link")).toHaveAttribute("href", "https://github.com/techminds-unipd")
    });
    test("Renders the Tech Minds text in footer", () => {
        render(<Footer/>)
        expect(screen.getByText("Made by Tech Minds")).toBeInTheDocument()
    });
})
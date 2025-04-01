import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import { PersonCard } from "./PersonCard";

describe("PersonCard test", () => {
    test("Empty values", () => {
        render(<PersonCard name="" gitHubUsername="" />);
        expect(screen.getByRole("link")).toHaveTextContent("Name Surname");
        expect(screen.getByRole("link")).toHaveAttribute("href", "https://github.com/github");
        expect(screen.getByRole("img")).toHaveAttribute("src", "https://github.com/github.png");
    });

    test("Both props passed", () => {
        render(<PersonCard name="Linus Torvalds" gitHubUsername="torvalds" />);
        expect(screen.getByRole("link")).toHaveTextContent("Linus Torvalds");
        expect(screen.getByRole("link")).toHaveAttribute("href", "https://github.com/torvalds");
        expect(screen.getByRole("img")).toHaveAttribute("src", "https://github.com/torvalds.png");
    });
});

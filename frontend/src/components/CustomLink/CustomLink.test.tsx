import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import { MemoryRouter } from "react-router";
import { CustomLink } from "./CustomLink";

describe("CustomLink", () => {
    const text = "about us";
    const dest = "/aboutus";

    test("Renders a link if the link is on a different route", () => {
        const route = "/";
        render(
            <MemoryRouter initialEntries={[route]}>
                <CustomLink name={text} link={dest} />
            </MemoryRouter>
        );
        expect(screen.getByText(text).tagName).toBe("A");
        expect(screen.getByText(text)).toHaveAttribute("href", dest);
    });

    test("Renders a simple text if the link is on the same route", () => {
        const route = "/aboutus";
        render(
            <MemoryRouter initialEntries={[route]}>
                <CustomLink name={text} link={dest} />
            </MemoryRouter>
        );
        expect(screen.getByText(text).tagName).toBe("P");
    });

    test("Renders the text passed as name prop when CustomLink is a link", () => {
        const route = "/";
        render(
            <MemoryRouter initialEntries={[route]}>
                <CustomLink name={text} link={dest} />
            </MemoryRouter>
        );
        expect(screen.getByText(text)).toBeInTheDocument();
    });

    test("Renders the text passed as name prop when CustomLink is not a link", () => {
        const route = "/aboutus";
        render(
            <MemoryRouter initialEntries={[route]}>
                <CustomLink name={text} link={dest} />
            </MemoryRouter>
        );
        expect(screen.getByText(text)).toBeInTheDocument();
    });
});

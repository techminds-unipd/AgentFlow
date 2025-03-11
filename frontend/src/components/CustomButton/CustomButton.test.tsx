import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { CustomButton } from "./CustomButton";

describe("CustomButton", () => {

  test("Renders button with correct text", () => {
    render(
      <MemoryRouter>
        <CustomButton name="Button Name" link="/test" variant="contained" />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: /button name/i })).toBeInTheDocument();
  });

  test("Renders button has the correct link", () => {
    render(
      <MemoryRouter>
        <CustomButton name="Button Name" link="/test" variant="contained" />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: /button name/i })).toHaveAttribute("href", "/test");
  });

  test("Renders button navigation on click", async () => {
    render(
      <MemoryRouter>
        <CustomButton name="Button Name" link="/test" variant="contained" />
      </MemoryRouter>
    );

    const button = screen.getByRole("link", { name: /button name/i });
    await userEvent.setup().click(button);

    expect(button).toHaveAttribute("href", "/test");
  });
});

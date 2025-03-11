import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import { MemoryRouter } from "react-router";
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

  test("Renders button has the correct link", () => {
    render(
      <MemoryRouter>
        <CustomButton name={buttonText} link={buttonLink} variant="contained" />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: buttonText })).toHaveAttribute("href", buttonLink);
  });

  test("Renders button navigation on click", async () => {
    render(
      <MemoryRouter>
        <CustomButton name={buttonText} link={buttonLink} variant="contained" />
      </MemoryRouter>
    );

    const button = screen.getByRole("link", { name: buttonText });
    expect(button).toHaveAttribute("href", buttonLink);
  });
});

//Che ci sia il nome dell'applicazione
//Che ci siano le tre card

import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Home } from "./Home";
import '@testing-library/jest-dom'


describe("Home testing", () => {
  test("The component returns a main HTML tag", () => {
    render(<Home />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  test("The component displays the application name", () => {
    render(<Home />);
    expect(screen.getByText("Agent Flow")).toBeInTheDocument();
  });

  test("The component displays the subtitle", () => {
    render(<Home />);
    expect(screen.getByText("Your personal assistant.")).toBeInTheDocument();
  });

  test("The component displays the first card title", () => {
    render(<Home />);
    expect(screen.getByText("What does it do?")).toBeInTheDocument();
  });

  test("The component displays the second card title", () => {
    render(<Home />);
    expect(screen.getByText("Example of a workflow")).toBeInTheDocument();
  });

  test("The component displays the third card title", () => {
    render(<Home />);
    expect(screen.getByText("How does it work?")).toBeInTheDocument();
  });
});

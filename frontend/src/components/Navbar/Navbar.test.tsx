import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, test, describe, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  test("Renders logout menu item", () => {
    const fn = vi.fn();
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(cio.getByRole("navbar")).toBeInTheDocument();
  });
    
});
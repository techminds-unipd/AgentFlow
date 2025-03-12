import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, describe, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { LogoutMenuItem } from "./LogoutMenuItem";

describe("LogoutMenuItem", () => {
  test("Renders logout menu item", () => {
    const fn = vi.fn();
    render(
      <MemoryRouter>
        <LogoutMenuItem handleCloseMenu={fn} />
      </MemoryRouter>
    );

    expect(screen.getByRole("menuitem")).toBeInTheDocument();
  });

  test("Renders open dialog if logout menu item is clicked", () => {
    const fn = vi.fn();
    render(
      <MemoryRouter>
        <LogoutMenuItem handleCloseMenu={fn} />
      </MemoryRouter>
    );

    const logoutMenuItem = screen.getByRole("menuitem");
    
    expect(screen.queryByRole("dialog")).toBeNull();
    fireEvent.click(logoutMenuItem);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  

  
});
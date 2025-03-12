import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, test, describe, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router";
import { useNavigate } from "react-router";
import { LogoutMenuItem } from "./LogoutMenuItem";

describe("LogoutMenuItem", () => {
  
  const mockPush = vi.fn();
  vi.mock('@hooks/useNavigation', () => {
    return {
      default: () => ({
        push: mockPush,
      }),
    };
  });

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

  test("Renders close dialog if 'no' button is clicked", async () => {
    const fn = vi.fn();
    render(
        <MemoryRouter>
            <LogoutMenuItem handleCloseMenu={fn} />
        </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("menuitem"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /no/i }));
    await waitFor(() => {
        expect(screen.queryByRole("dialog")).toBeNull();
    });
  });

  test("Renders close dialog if 'yes' button is clicked", async () => {
    const fn = vi.fn();
    render(
        <MemoryRouter>
            <LogoutMenuItem handleCloseMenu={fn} />
        </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("menuitem"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /yes/i }));
    await waitFor(() => {
        expect(screen.queryByRole("dialog")).toBeNull();
    });
  });

  test("Renders navigate in home page if the 'yes' button is clicked", async () => {
    const fn = vi.fn();
    render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route path="/test" element={<LogoutMenuItem handleCloseMenu={fn}></LogoutMenuItem>} />
          <Route path="/" element={<div>Test home page</div>} />
        </Routes>
      </MemoryRouter>
    );
  
    expect(screen.queryByRole("dialog")).toBeNull();
    fireEvent.click(screen.getByRole("menuitem"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    const button = screen.getByRole("button", { name: /yes/i });
    expect(button).toBeDefined();
    await userEvent.click(screen.getByRole("button", { name: /yes/i }));
    await waitFor(() => {
      expect(screen.getByText('Test home page')).toBeInTheDocument();
    });

  });
    
});
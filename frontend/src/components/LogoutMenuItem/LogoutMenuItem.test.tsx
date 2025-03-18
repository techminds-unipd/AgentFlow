import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, test, describe, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router";
import { LogoutMenuItem } from "./LogoutMenuItem";
import { AuthProvider } from "../../context/AuthContext";

describe("LogoutMenuItem", () => {
  
  const mockPush = vi.fn();
  vi.mock("@hooks/useNavigation", () => {
    return {
      default: () => ({
        push: mockPush,
      }),
    };
  });

  test("Renders logout menu item", () => {
    const fn = vi.fn();
    render(
      <AuthProvider>
        <MemoryRouter>
          <LogoutMenuItem handleCloseMenu={fn} />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByRole("menuitem")).toBeInTheDocument();
  });

  test("Renders open dialog if logout menu item is clicked", () => {
    const fn = vi.fn();
    render(
      <AuthProvider>
        <MemoryRouter>
          <LogoutMenuItem handleCloseMenu={fn} />
        </MemoryRouter>
      </AuthProvider>
    );

    const logoutMenuItem = screen.getByRole("menuitem");
    
    expect(screen.queryByRole("dialog")).toBeNull();
    fireEvent.click(logoutMenuItem);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("Renders close dialog if 'no' button is clicked", async () => {
    const fn = vi.fn();
    render(
      <AuthProvider>
        <MemoryRouter>
          <LogoutMenuItem handleCloseMenu={fn} />
        </MemoryRouter>
      </AuthProvider>
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
      <AuthProvider>
        <MemoryRouter>
          <LogoutMenuItem handleCloseMenu={fn} />
        </MemoryRouter>
      </AuthProvider>
    );

    fireEvent.click(screen.getByRole("menuitem"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /yes/i }));
    await waitFor(() => {
        expect(screen.queryByRole("dialog")).toBeNull();
    });
  });

  test("Renders navigate in sign in page if the 'yes' button is clicked", async () => {
    const fn = vi.fn();
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/test"]}> 
          <Routes>
            <Route path="/test" element={<LogoutMenuItem handleCloseMenu={fn}></LogoutMenuItem>} />
            <Route path="/signin" element={<div>Test sign in</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );
  
    expect(screen.queryByRole("dialog")).toBeNull();
    fireEvent.click(screen.getByRole("menuitem"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    const button = screen.getByRole("button", { name: /yes/i });
    expect(button).toBeDefined();
    await userEvent.click(screen.getByRole("button", { name: /yes/i }));
    await waitFor(() => {
      expect(screen.getByText("Test sign in")).toBeInTheDocument();
    });

  });
    
});
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, test, describe, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router";
import { LogoutMenuItem } from "./LogoutMenuItem";
import { AuthContextType, authProviderRender, providerPropsInit} from "../../context/MockedAuthProvider"

describe("LogoutMenuItem", () => {
  let providerProps: AuthContextType;
  beforeEach(()=>{providerProps=providerPropsInit()})
  
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
    authProviderRender(
        <MemoryRouter>
          <LogoutMenuItem handleCloseMenu={fn} />
        </MemoryRouter>,
        providerProps
    );

    expect(screen.getByRole("menuitem")).toBeInTheDocument();
  });

  test("Renders open dialog if logout menu item is clicked", () => {
    const fn = vi.fn();
    authProviderRender(
      <MemoryRouter>
        <LogoutMenuItem handleCloseMenu={fn} />
      </MemoryRouter>,
      providerProps
  );

    const logoutMenuItem = screen.getByRole("menuitem");
    
    expect(screen.queryByRole("dialog")).toBeNull();
    fireEvent.click(logoutMenuItem);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("Renders close dialog if 'no' button is clicked", async () => {
    const fn = vi.fn();
    authProviderRender(
      <MemoryRouter>
        <LogoutMenuItem handleCloseMenu={fn} />
      </MemoryRouter>,
      providerProps
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
    authProviderRender(
      <MemoryRouter>
        <LogoutMenuItem handleCloseMenu={fn} />
      </MemoryRouter>,
      providerProps
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
    authProviderRender(
        <MemoryRouter initialEntries={["/test"]}> 
          <Routes>
            <Route path="/test" element={<LogoutMenuItem handleCloseMenu={fn}></LogoutMenuItem>} />
            <Route path="/signin" element={<div>Test sign in</div>} />
          </Routes>
        </MemoryRouter>,
        providerProps
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
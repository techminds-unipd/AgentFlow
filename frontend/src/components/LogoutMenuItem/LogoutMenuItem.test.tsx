import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, test, describe, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router";
import { LogoutMenuItem } from "./LogoutMenuItem";
import {
  AuthContextType,
  MockedAuthProvider,
  providerPropsInit,
} from "../../context/MockedAuthProvider";
import {
  googleProviderPropsInit,
  MockedGoogleTokenProvider,
  GoogleAccountTokenType,
} from "../../context/MockedGoogleTokenProvider";

describe("LogoutMenuItem", () => {
  let providerProps: AuthContextType;
  let googleProps: GoogleAccountTokenType;
  beforeEach(() => {
    providerProps = providerPropsInit();
    googleProps = googleProviderPropsInit();
  });

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
      <MockedAuthProvider {...providerProps}>
        <MockedGoogleTokenProvider {...googleProps}>
          <MemoryRouter>
            <LogoutMenuItem handleCloseMenu={fn} />
          </MemoryRouter>
        </MockedGoogleTokenProvider>
      </MockedAuthProvider>
    );

    expect(screen.getByRole("menuitem")).toBeInTheDocument();
  });

  test("Renders open dialog if logout menu item is clicked", () => {
    const fn = vi.fn();
    render(
      <MockedAuthProvider {...providerProps}>
        <MockedGoogleTokenProvider {...googleProps}>
          <MemoryRouter>
            <LogoutMenuItem handleCloseMenu={fn} />
          </MemoryRouter>
        </MockedGoogleTokenProvider>
      </MockedAuthProvider>
    );

    const logoutMenuItem = screen.getByRole("menuitem");

    expect(screen.queryByRole("dialog")).toBeNull();
    fireEvent.click(logoutMenuItem);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("Renders close dialog if 'no' button is clicked", async () => {
    const fn = vi.fn();
    render(
      <MockedAuthProvider {...providerProps}>
        <MockedGoogleTokenProvider {...googleProps}>
          <MemoryRouter>
            <LogoutMenuItem handleCloseMenu={fn} />
          </MemoryRouter>
        </MockedGoogleTokenProvider>
      </MockedAuthProvider>
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
      <MockedAuthProvider {...providerProps}>
        <MockedGoogleTokenProvider {...googleProps}>
          <MemoryRouter>
            <LogoutMenuItem handleCloseMenu={fn} />
          </MemoryRouter>
        </MockedGoogleTokenProvider>
      </MockedAuthProvider>
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
      <MockedAuthProvider {...providerProps}>
        <MockedGoogleTokenProvider {...googleProps}>
          <MemoryRouter initialEntries={["/test"]}>
            <Routes>
              <Route
                path="/test"
                element={<LogoutMenuItem handleCloseMenu={fn}></LogoutMenuItem>}
              />
              <Route path="/signin" element={<div>Test sign in</div>} />
            </Routes>
          </MemoryRouter>
        </MockedGoogleTokenProvider>
      </MockedAuthProvider>
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

import "@testing-library/jest-dom";
import {screen, render} from "@testing-library/react";
import {expect, test, describe, beforeEach} from "vitest";
import { Navbar } from "./Navbar";
import { MemoryRouter } from "react-router";
import { AuthContextType, MockedAuthProvider, providerPropsInit} from "../../context/MockedAuthProvider"



describe("Navbar", () => {
  let providerProps: AuthContextType;

  beforeEach(() => {
    providerProps = providerPropsInit(false); // inizio utente non loggato
  });

  test("Renders the navbar", () => {
    render(
      <MockedAuthProvider {...providerProps}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </MockedAuthProvider>
    );
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  test("Renders navigation links", () => {
    authProviderRender(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
      providerProps
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
  });

  test("Renders the logo", () => {
    authProviderRender(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
      providerProps
    );
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Logo Tech Minds");
  });

  test("Shows 'Sign In' and 'Sign Up' when user is not logged in", () => {
    authProviderRender(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
      providerProps
    );

    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  test("Shows 'Dashboard' and user menu when user is logged in", () => {
    providerProps = providerPropsInit(true, "testUser", "testToken"); // utente loggato

    authProviderRender(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
      providerProps
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByLabelText("account of current user")).toBeInTheDocument();
  });
});

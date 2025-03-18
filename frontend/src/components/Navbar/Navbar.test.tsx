import "@testing-library/jest-dom";
import {screen} from "@testing-library/react";
import {expect, test, describe, beforeEach} from "vitest";
import { Navbar } from "./Navbar";
import { MemoryRouter } from "react-router";
import { AuthContextType, authProviderRender, providerPropsInit} from "../../context/MockedAuthProvider"



describe("Navbar", () => {
  //TODO DA DIFFERENZIARE TRA QUANDO L'UTENTE E' LOGGATO E QUANDO NON LO E'
  let providerProps: AuthContextType;
  beforeEach(()=>{providerProps=providerPropsInit()})
  
  test("Renders the navbar", () => {
    authProviderRender(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>,
        providerProps
    );
    expect(screen.getByRole("banner")).toBeInTheDocument()
  });

  test("Renders the home item", () => {
    authProviderRender(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>,
        providerProps
  );
      expect(screen.getByText("Home")).toBeInTheDocument()
  });
  
  test("Renders the about us item", () => {
    authProviderRender(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>,
        providerProps
    );
      expect(screen.getByText("About Us")).toBeInTheDocument()
  });

  test("Renders the Agent Flow item", () => {
    authProviderRender(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>,
        providerProps
    );
      expect(screen.getByText("Agent Flow")).toBeInTheDocument()
  });

  test("Renders the logo", () => {
    authProviderRender(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>,
        providerProps
    );
    expect(screen.getByRole("img")).toHaveAttribute(
      "alt",
      "Logo Tech Minds"
    );
  });

  /*
  //Da qui in poi si vedono i test della navbar quando l'utente è loggato
  //i test a seguire non funzionano
  test("Renders the Sign In item", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    //expect(screen.getByRole("link", { name: "Sign In"})).toBeInTheDocument();
    //expect(screen.getByRole("button", { name: "Sign In"})).toBeInTheDocument();
  });

  test("Renders the Sign Up item", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    //expect(screen.getByRole("link", { name: "Sign Up"})).toBeInTheDocument();
    //expect(screen.getByRole("button", { name: "Sign Up"})).toBeInTheDocument();
  });*/
});
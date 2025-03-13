import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import {expect, test, describe} from "vitest";
import { Navbar } from "./Navbar";
import { MemoryRouter } from "react-router";

describe("Navbar", () => {
  //DA DIFFERENZIARE TRA QUANDO L'UTENTE E' LOGGATO E QUANDO NON LO E'
  test("Renders the navbar", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByRole("banner")).toBeInTheDocument()
  });

  test("Renders the home item", () => {
    render(
      <MemoryRouter>
          <Navbar />
      </MemoryRouter>
  );
      expect(screen.getByText("Home")).toBeInTheDocument()
  });
  
  test("Renders the about us item", () => {
    render(
      <MemoryRouter>
          <Navbar />
      </MemoryRouter>
    );
      expect(screen.getByText("About Us")).toBeInTheDocument()
  });

  test("Renders the Agent Flow item", () => {
    render(
      <MemoryRouter>
          <Navbar />
      </MemoryRouter>
    );
      expect(screen.getByText("Agent Flow")).toBeInTheDocument()
  });

  test("Renders the logo", () => {
    render(
      <MemoryRouter>
          <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByRole("img")).toHaveAttribute(
      "alt",
      "Logo Tech Minds"
    );
  });

  /*
  //Da qui in poi si vedono i test della navbar quando l'utente è loggato
  test("Renders the workflow item", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText("Workflow")).toBeInTheDocument();
  });
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
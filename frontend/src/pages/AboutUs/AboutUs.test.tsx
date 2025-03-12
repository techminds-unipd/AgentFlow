import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { expect, test, describe, assert } from "vitest";
import { AboutUs } from "./AboutUs";

describe("AboutUs section test", ()=>{
    test("Logo is present", ()=>{
        render(<AboutUs/>);
        expect(screen.getByAltText("Tech Minds logo")).toBeInTheDocument();
    });
    test("6 PersonCards are present", ()=>{
        render(<AboutUs/>);
        const personCards = screen.getAllByRole("img");
        assert(personCards.length>=7);
    });
    test("Link to documentation is present", ()=>{
        render(<AboutUs/>);
        const linksArray = screen.getAllByRole("link");
        assert(linksArray.some(link => link.getAttribute('href') === 'https://techminds-unipd.github.io/docs/'));
    });
})
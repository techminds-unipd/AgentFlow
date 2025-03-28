import { useGoogleToken } from "./useGoogleToken";
import { render } from "@testing-library/react";
import { describe, test, expect, beforeEach } from "vitest";
import { GoogleAccountTokenType, MockedGoogleTokenProvider, googleProviderPropsInit } from "../context/MockedGoogleTokenProvider";
import { JSX } from "react";

describe("useGoogleToken hook tests", () => {
    let providerProps: GoogleAccountTokenType;
    beforeEach(() => {
        providerProps = googleProviderPropsInit();
    });
    test("TUF49 - A component that is wrapped with GoogleTokenProvider and invoked useGoogleToken can access context", () => {
        const TestComponent = (): JSX.Element => {
            const context = useGoogleToken();
            return <div>TestComponent {JSON.stringify(context)}</div>;
        };
        render(
            <MockedGoogleTokenProvider {...providerProps}>
                <TestComponent />
            </MockedGoogleTokenProvider>
        );
    });

    test("TUF50 - Throws an error when a component that uses useGoogleToken isn't wrapped with GoogleTokenProvider", () => {
        const TestComponent = (): JSX.Element => {
            const context = useGoogleToken();
            return <div>TestComponent {JSON.stringify(context)}</div>;
        };
        expect(() => render(<TestComponent />)).toThrowError();
    });
});

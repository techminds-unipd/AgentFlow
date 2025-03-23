import { expect, test, describe, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { useAuth } from "./useAuth";
import { AuthContextType, MockedAuthProvider, providerPropsInit } from "../context/MockedAuthProvider";

describe("useAuth hook", () => {
    let providerProps: AuthContextType;
    beforeEach(() => {
        providerProps = providerPropsInit();
    });
    test("A component that is wrapped with AuthProvider and invokes useAuth can access context", async () => {
        const TestComponent = () => {
            const context = useAuth();
            return <div>TestComponent {JSON.stringify(context)}</div>;
        };
        render(
            <MockedAuthProvider {...providerProps}>
                <TestComponent />
            </MockedAuthProvider>
        );
    });

    test("Throws an error when a component that uses useAuth isn't wrapped with AuthProvider", async () => {
        const TestComponent = () => {
            const context = useAuth();
            return <div>TestComponent {JSON.stringify(context)}</div>;
        };
        expect(() => render(<TestComponent />)).toThrowError();
    });
});

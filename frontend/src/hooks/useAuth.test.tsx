import { expect, test, describe, } from "vitest";
import { render } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import { useAuth } from "./useAuth"

describe("useAuth hook" , () => {
    test("A component that is wrapped with AuthProvider and invokes useAuth can access context", async () => {
        const TestComponent = () => {
            const context = useAuth();
            return (
                <div>
                    TestComponent {JSON.stringify(context)}
                </div>
            )
        }
        render(<AuthProvider><TestComponent></TestComponent></AuthProvider>);
    })

    test("Throws an error when a component that uses useAuth isn't wrapped with AuthProvider", async () => {
        const TestComponent = () => {
            const context = useAuth();
            return (
                <div>
                    TestComponent {JSON.stringify(context)}
                </div>
            )
        }
        expect(()=>render(<TestComponent></TestComponent>)).toThrowError();
        
    })

})
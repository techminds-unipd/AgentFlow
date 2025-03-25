import { expect, test, describe, beforeEach, vi } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import { RegisterService } from "../services/registerService";
import { useRegister } from "./useRegister";
import "@testing-library/jest-dom";

describe("useRegister hook", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    const username = "Test";
    const password = "Passoword.1";

    const TestComponent = ({ username, password }: { username: string; password: string }) => {
        const { registerUser, error } = useRegister();

        const handleRegister = async () => {
            await registerUser(username, password);
        };

        return (
            <div>
                <p>Error: {JSON.stringify(error)}</p>
                <button onClick={handleRegister}>Register</button>
            </div>
        );
    };

    test("Registers user successfully", async () => {
        vi.spyOn(RegisterService.prototype, "register").mockResolvedValue({ username: username, password: password });

        render(<TestComponent username={username} password={password} />);

        act(() => {
            screen.getByText("Register").click();
        });

        await waitFor(() => {
            expect(screen.getByText(/Error: null/i)).toBeInTheDocument();
        });
    });

    test("Handles error when username already exists", async () => {
        vi.spyOn(RegisterService.prototype, "register").mockRejectedValue(new Error("Username already exists"));

        render(<TestComponent username={username} password={password} />);

        act(() => {
            screen.getByText("Register").click();
        });

        await waitFor(() => {
            expect(screen.getByText(/Error: "Username already exists"/i)).toBeInTheDocument();
        });
    });

    test("Handles server error", async () => {
        vi.spyOn(RegisterService.prototype, "register").mockRejectedValue(new Error("Server error"));

        render(<TestComponent username={username} password={password} />);

        act(() => {
            screen.getByText("Register").click();
        });

        await waitFor(() => {
            expect(screen.getByText(/Error: "Server error"/i)).toBeInTheDocument();
        });
    });

    test("Handles generic error", async () => {
        vi.spyOn(RegisterService.prototype, "register").mockRejectedValue(new Error("Generic error"));

        render(<TestComponent username={username} password={password} />);

        act(() => {
            screen.getByText("Register").click();
        });

        await waitFor(() => {
            expect(screen.getByText(/Error: "Generic error"/i)).toBeInTheDocument();
        });
    });
});

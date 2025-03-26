import { expect, test, describe, beforeEach, vi } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import { RegisterService } from "../services/registerService";
import { useRegister } from "./useRegister";
import "@testing-library/jest-dom";
import { UserDTO } from "../services/dto/UserDto";

describe("useRegister hook", () => {
    let mockRegisterService: RegisterService;
    const username = "Test";
    const password = "Passoword.1";  
    const user = new UserDTO(username, password);

    beforeEach(() => {
        vi.restoreAllMocks();

        mockRegisterService = {
            register: vi.fn().mockResolvedValue(user),
        } as unknown as RegisterService;
    });

    const TestComponent: React.FC<{ user: UserDTO; service: RegisterService }> = ({ user, service }) => {
        const { registerUser, error } = useRegister(service);

        const handleRegister = async (): Promise<void> => {
            await registerUser(user);
        };
        return (
            <div>
                <p>Error: {JSON.stringify(error)}</p>
                <button onClick={() => void handleRegister()}>Register</button>
            </div>
        );
    };

    test("Registers user successfully", async () => {
        mockRegisterService.register = vi.fn().mockResolvedValue({ user });

        render(<TestComponent user={user} service={mockRegisterService} />);

        act(() => {
            screen.getByText("Register").click();
        });

        await waitFor(() => {
            expect(screen.getByText(/Error: null/i)).toBeInTheDocument();
        });
    });

    test("Handles error when username already exists", async () => {
        mockRegisterService.register = vi.fn().mockRejectedValue(new Error("Username already exists"));

        render(<TestComponent user={user} service={mockRegisterService} />);

        act(() => {
            screen.getByText("Register").click();
        });

        await waitFor(() => {
            expect(screen.getByText(/Error: "Username already exists"/i)).toBeInTheDocument();
        });
    });

    test("Handles server error", async () => {
        mockRegisterService.register = vi.fn().mockRejectedValue(new Error("Server error"));

        render(<TestComponent user={user} service={mockRegisterService} />);

        act(() => {
            screen.getByText("Register").click();
        });

        await waitFor(() => {
            expect(screen.getByText(/Error: "Server error"/i)).toBeInTheDocument();
        });
    });

    test("Handles generic error", async () => {
        mockRegisterService.register = vi.fn().mockRejectedValue(new Error("Generic error"));

        render(<TestComponent user={user} service={mockRegisterService} />);

        act(() => {
            screen.getByText("Register").click();
        });

        await waitFor(() => {
            expect(screen.getByText(/Error: "Generic error"/i)).toBeInTheDocument();
        });
    });
});

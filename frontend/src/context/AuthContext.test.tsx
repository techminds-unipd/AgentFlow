import { expect, test, describe, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthContext, AuthProvider, User } from "./AuthContext";
import { JSX, useContext } from "react";
import { LoginService } from "../services/LoginService";
import { UserDTO } from "../services/dto/userDTO";

describe("AuthContext Login", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test("TUF21 - Sets user.username when login succeeds", async () => {
        const CustomTest = ({ userDTO }: { userDTO: UserDTO }): JSX.Element => {
            const context = useContext(AuthContext);
            if (!context) throw new Error("Context is undefined");

            const { user, loginUser } = context;
            return (
                <>
                    <div data-testid="user">{JSON.stringify(user?.username)}</div>
                    <button onClick={() => void loginUser(userDTO)} aria-label="login">
                        Login
                    </button>
                </>
            );
        };

        vi.spyOn(LoginService.prototype, "login").mockResolvedValue({ accessToken: "Token" });

        const userDTO = new UserDTO("testUsername", "testPassword");
        render(
            <AuthProvider>
                <CustomTest userDTO={userDTO} />
            </AuthProvider>
        );

        expect(screen.getByTestId("user")).toBeEmptyDOMElement();
        fireEvent.click(screen.getByRole("button", { name: "login" }));
        await waitFor(() => {
            expect(screen.getByTestId("user")).toHaveTextContent(userDTO.username);
        });
    });

    test("TUF22 - Sets user.accessToken when login succeeds", async () => {
        const CustomTest = ({ userDTO }: { userDTO: UserDTO }): JSX.Element => {
            const context = useContext(AuthContext);
            if (!context) throw new Error("Context is undefined");

            const { user, loginUser } = context;
            return (
                <>
                    <div data-testid="token">{JSON.stringify(user?.accessToken)}</div>
                    <button onClick={() => void loginUser(userDTO)} aria-label="login">
                        Login
                    </button>
                </>
            );
        };

        const accessToken = "testToken";
        vi.spyOn(LoginService.prototype, "login").mockResolvedValue({ accessToken });

        const userDTO = new UserDTO("testUsername", "testPassword");
        render(
            <AuthProvider>
                <CustomTest userDTO={userDTO} />
            </AuthProvider>
        );

        expect(screen.getByTestId("token")).toBeEmptyDOMElement();
        fireEvent.click(screen.getByRole("button", { name: "login" }));
        await waitFor(() => {
            expect(screen.getByTestId("token")).toHaveTextContent(accessToken);
        });
    });

    test("TUF23 - Writes username and accessToken in localStorage with key 'user' when login succeeds", async () => {
        const CustomTest = ({ userDTO }: { userDTO: UserDTO }): JSX.Element => {
            const context = useContext(AuthContext);
            if (!context) throw new Error("Context is undefined");

            const { loginUser } = context;
            return (
                <button onClick={() => void loginUser(userDTO)} aria-label="login">
                    Login
                </button>
            );
        };

        const accessToken = "testToken";
        vi.spyOn(LoginService.prototype, "login").mockResolvedValue({ accessToken });

        const userDTO = new UserDTO("testUsername", "testPassword");
        const user = { username: userDTO.username, accessToken };

        render(
            <AuthProvider>
                <CustomTest userDTO={userDTO} />
            </AuthProvider>
        );

        fireEvent.click(screen.getByRole("button", { name: "login" }));
        await waitFor(() => {
            expect(localStorage.getItem("user")).toEqual(JSON.stringify(user));
        });
    });

    test("TUF24 - Sets user at boot when saved in localStorage", () => {
        const CustomTest = (): JSX.Element => {
            const context = useContext(AuthContext);
            if (!context) throw new Error("Context is undefined");

            const { user } = context;
            return (
                <>
                    <div data-testid="user">{JSON.stringify(user?.username)}</div>
                    <div data-testid="token">{JSON.stringify(user?.accessToken)}</div>
                </>
            );
        };

        const userDTO = new UserDTO("testUsername", "testPassword");
        const accessToken = "testToken";
        const user = { username: userDTO.username, accessToken };
        localStorage.setItem("user", JSON.stringify(user));

        render(
            <AuthProvider>
                <CustomTest />
            </AuthProvider>
        );

        expect(screen.getByTestId("user")).toHaveTextContent(user.username);
        expect(screen.getByTestId("token")).toHaveTextContent(user.accessToken);
    });

    test("TUF25 - Sets an error containing 'wrong username or password' when login fails due to wrong credentials", async () => {
        const CustomTest = ({ userDTO }: { userDTO: UserDTO }): JSX.Element => {
            const context = useContext(AuthContext);
            if (!context) throw new Error("Context is undefined");

            const { loginUser, error } = context;
            return (
                <>
                    <div data-testid="error">{error?.toString()}</div>
                    <button onClick={() => void loginUser(userDTO)} aria-label="login">
                        Login
                    </button>
                </>
            );
        };

        vi.spyOn(LoginService.prototype, "login").mockRejectedValue(new Error("wrong username or password"));

        const userDTO = new UserDTO("testUsername", "testPassword");
        render(
            <AuthProvider>
                <CustomTest userDTO={userDTO} />
            </AuthProvider>
        );
        expect(screen.getByTestId("error")).toBeEmptyDOMElement();
        act(() => {
            fireEvent.click(screen.getByRole("button", { name: "login" }));
        });
        await waitFor(() => {
            expect(screen.getByTestId("error")).toHaveTextContent(/wrong username or password/);
        });
    });

    test("TUF26 - Sets empty user.username and user.accessToken when login fails due to wrong credentials", async () => {
        const CustomTest = ({ userDTO }: { userDTO: UserDTO }): JSX.Element => {
            const context = useContext(AuthContext);
            if (!context) throw new Error("Context is undefined");

            const { user, loginUser } = context;
            return (
                <>
                    <div data-testid="user">{JSON.stringify(user?.accessToken)}</div>
                    <div data-testid="token">{JSON.stringify(user?.accessToken)}</div>
                    <button onClick={() => void loginUser(userDTO)} aria-label="login">
                        Login
                    </button>
                </>
            );
        };

        vi.spyOn(LoginService.prototype, "login").mockRejectedValue(new Error("wrong username or password"));

        const userDTO = new UserDTO("testUsername", "testPassword");
        render(
            <AuthProvider>
                <CustomTest userDTO={userDTO} />
            </AuthProvider>
        );
        expect(screen.getByTestId("user")).toBeEmptyDOMElement();
        expect(screen.getByTestId("token")).toBeEmptyDOMElement();
        fireEvent.click(screen.getByRole("button", { name: "login" }));
        await waitFor(() => {
            expect(screen.getByTestId("user")).toBeEmptyDOMElement();
            expect(screen.getByTestId("token")).toBeEmptyDOMElement();
        });
    });
});

describe("AuthContext Logout", () => {
    const fetchSpy = vi.spyOn(window, "fetch");

    beforeEach(() => {
        fetchSpy.mockReset();
        localStorage.clear();
    });

    test("TUF27 - Logout sets user to null", async () => {
        const CustomTest = ({ userDTO }: { userDTO: UserDTO }): JSX.Element => {
            const context = useContext(AuthContext);
            if (!context) throw new Error("Context is undefined");

            const { user, loginUser, logoutUser } = context;
            return (
                <>
                    <div data-testid="user">{JSON.stringify(user)}</div>
                    <button onClick={() => void loginUser(userDTO)} aria-label="login">
                        Login
                    </button>
                    <button onClick={() => logoutUser()} aria-label="logout">
                        Logout
                    </button>
                </>
            );
        };

        const accessToken = "testToken";
        vi.spyOn(LoginService.prototype, "login").mockResolvedValue({ accessToken: accessToken });

        const userDTO = new UserDTO("testUsername", "testPassword");
        render(
            <AuthProvider>
                <CustomTest userDTO={userDTO} />
            </AuthProvider>
        );
        expect(screen.getByTestId("user")).toHaveTextContent(JSON.stringify(null));
        fireEvent.click(screen.getByRole("button", { name: "login" }));
        await waitFor(() => {
            expect(screen.getByTestId("user")).toHaveTextContent(userDTO.username);
        });
        fireEvent.click(screen.getByRole("button", { name: "logout" }));
        await waitFor(() => {
            expect(screen.getByTestId("user")).toHaveTextContent(JSON.stringify(null));
        });
    });

    test("TUF28 - Logout sets token to null", async () => {
        const CustomTest = ({ userDTO }: { userDTO: UserDTO }): JSX.Element => {
            const context = useContext(AuthContext);
            if (!context) throw new Error("Context is undefined");

            const { user, loginUser, logoutUser } = context;
            return (
                <>
                    <div data-testid="token">{JSON.stringify(user?.accessToken)}</div>
                    <button onClick={() => void loginUser(userDTO)} aria-label="login">
                        Login
                    </button>
                    <button onClick={() => logoutUser()} aria-label="logout">
                        Logout
                    </button>
                </>
            );
        };

        const accessToken = "testToken";
        vi.spyOn(LoginService.prototype, "login").mockResolvedValue({ accessToken: accessToken });

        const userDTO = new UserDTO("testUsername", "testPassword");
        render(
            <AuthProvider>
                <CustomTest userDTO={userDTO} />
            </AuthProvider>
        );
        fireEvent.click(screen.getByRole("button", { name: "login" }));
        await waitFor(() => {
            expect(screen.getByTestId("token")).toHaveTextContent(accessToken);
        });
        fireEvent.click(screen.getByRole("button", { name: "logout" }));
        await waitFor(() => {
            expect(screen.getByTestId("token")).toBeEmptyDOMElement();
        });
    });

    test("TUF29 - Logout clears localStorage with key 'user'", async () => {
        const CustomTest = (): JSX.Element => {
            const context = useContext(AuthContext);
            if (!context) throw new Error("Context is undefined");

            const { logoutUser } = context;
            return (
                <>
                    <button onClick={() => logoutUser()} aria-label="logout">
                        Logout
                    </button>
                </>
            );
        };

        const accessToken = "testToken";

        const mockResolveValue = {
            status: 201,
            json: async (): Promise<{ accessToken: string }> => new Promise((resolve) => resolve({ accessToken }))
        };
        fetchSpy.mockResolvedValue(mockResolveValue as Response);
        const userDTO = new UserDTO("testUsername", "testPassword");
        const user = { username: userDTO.username, accessToken } as User;
        localStorage.setItem("user", JSON.stringify(user));
        expect(localStorage.getItem("user")).toEqual(JSON.stringify(user));
        render(
            <AuthProvider>
                <CustomTest />
            </AuthProvider>
        );
        fireEvent.click(screen.getByRole("button", { name: "logout" }));
        await waitFor(() => {
            expect(JSON.stringify(localStorage.getItem("user"))).toEqual(JSON.stringify(null));
        });
    });
});

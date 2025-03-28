import { beforeEach, describe, expect, test } from "vitest";
import { GoogleTokenContext, GoogleTokenProvider } from "./GoogleTokenContext";
import { JSX, useContext } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("GoogleTokenContext test", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test("TUF30 - Sets googleToken.token in context after addGoogleToken is called", async () => {
        const TestComponent = (): JSX.Element => {
            const { googleToken, addGoogleToken } = useContext(GoogleTokenContext)!;
            return (
                <div>
                    <button
                        onClick={() =>
                            void addGoogleToken({
                                token: "test-token",
                                refreshToken: "refresh",
                                expireDate: "2023-12-31T23:59:59Z"
                            })
                        }
                    >
                        Add Google Account
                    </button>
                    <span>{googleToken?.token}</span>
                </div>
            );
        };

        render(
            <GoogleTokenProvider>
                <TestComponent />
            </GoogleTokenProvider>
        );

        fireEvent.click(screen.getByText("Add Google Account"));
        await waitFor(() => expect(screen.getByText("test-token")).toBeInTheDocument());
    });

    test("TUF31 - Sets googleToken.expireDate in context after addGoogleToken is called", async () => {
        const TestComponent = (): JSX.Element => {
            const { googleToken, addGoogleToken } = useContext(GoogleTokenContext)!;
            return (
                <div>
                    <button
                        onClick={() =>
                            void addGoogleToken({
                                token: "test-token",
                                refreshToken: "refresh",
                                expireDate: "2023-12-31T23:59:59Z"
                            })
                        }
                    >
                        Add Google Account
                    </button>
                    <span>{googleToken?.expireDate}</span>
                </div>
            );
        };

        render(
            <GoogleTokenProvider>
                <TestComponent />
            </GoogleTokenProvider>
        );

        fireEvent.click(screen.getByText("Add Google Account"));
        await waitFor(() => expect(screen.getByText("2023-12-31T23:59:59Z")).toBeInTheDocument());
    });

    test("TUF32 - Sets googleToken.refreshToken in context after addGoogleToken is called", async () => {
        const TestComponent = (): JSX.Element => {
            const { googleToken, addGoogleToken } = useContext(GoogleTokenContext)!;
            return (
                <div>
                    <button
                        onClick={() =>
                            void addGoogleToken({
                                token: "test-token",
                                refreshToken: "refresh",
                                expireDate: "2023-12-31T23:59:59Z"
                            })
                        }
                    >
                        Add Google Account
                    </button>
                    <span>{googleToken?.refreshToken}</span>
                </div>
            );
        };

        render(
            <GoogleTokenProvider>
                <TestComponent />
            </GoogleTokenProvider>
        );

        fireEvent.click(screen.getByText("Add Google Account"));
        await waitFor(() => expect(screen.getByText("refresh")).toBeInTheDocument());
    });

    test("TUF33 - Saves googleToken in local storage after addGoogleToken is called", async () => {
        const TestComponent = (): JSX.Element => {
            const { addGoogleToken } = useContext(GoogleTokenContext)!;
            return (
                <button
                    onClick={() =>
                        void addGoogleToken({ token: "test-token", refreshToken: "refresh", expireDate: "2023-12-31T23:59:59Z" })
                    }
                >
                    Add Google Account
                </button>
            );
        };

        render(
            <GoogleTokenProvider>
                <TestComponent />
            </GoogleTokenProvider>
        );

        fireEvent.click(screen.getByText("Add Google Account"));
        await waitFor(() =>
            expect(localStorage.getItem("GoogleAccountToken")).toBe(
                JSON.stringify({ token: "test-token", refreshToken: "refresh", expireDate: "2023-12-31T23:59:59Z" })
            )
        );
    });

    test("TUF34 - Removes googleToken.token and googleToken.expireDate from context after removeGoogleToken is called", async () => {
        const TestComponent = (): JSX.Element => {
            const { googleToken, addGoogleToken, removeGoogleToken } = useContext(GoogleTokenContext)!;
            return (
                <div>
                    <button
                        onClick={() =>
                            void addGoogleToken({
                                token: "test-token",
                                refreshToken: "refresh",
                                expireDate: "2023-12-31T23:59:59Z"
                            })
                        }
                    >
                        Add Google Account
                    </button>
                    <button onClick={removeGoogleToken}>Remove Google Account</button>
                    <span>{googleToken?.token}</span>
                    <span>{googleToken?.expireDate}</span>
                </div>
            );
        };

        render(
            <GoogleTokenProvider>
                <TestComponent />
            </GoogleTokenProvider>
        );

        fireEvent.click(screen.getByText("Add Google Account"));
        await waitFor(() => expect(screen.getByText("test-token")).toBeInTheDocument());
        fireEvent.click(screen.getByText("Remove Google Account"));
        await waitFor(() => expect(screen.queryByText("test-token")).not.toBeInTheDocument());
        await waitFor(() => expect(screen.queryByText("2023-12-31T23:59:59Z")).not.toBeInTheDocument());
    });

    test("TUF35 - Removes googleToken from local storage after removeGoogleToken is called", async () => {
        const TestComponent = (): JSX.Element => {
            const { addGoogleToken, removeGoogleToken } = useContext(GoogleTokenContext)!;
            return (
                <div>
                    <button
                        onClick={() =>
                            void addGoogleToken({
                                token: "test-token",
                                refreshToken: "refresh",
                                expireDate: "2023-12-31T23:59:59Z"
                            })
                        }
                    >
                        Add Google Account
                    </button>
                    <button onClick={removeGoogleToken}>Remove Google Account</button>
                </div>
            );
        };

        render(
            <GoogleTokenProvider>
                <TestComponent />
            </GoogleTokenProvider>
        );

        fireEvent.click(screen.getByText("Add Google Account"));
        await waitFor(() =>
            expect(localStorage.getItem("GoogleAccountToken")).toBe(
                JSON.stringify({ token: "test-token", refreshToken: "refresh", expireDate: "2023-12-31T23:59:59Z" })
            )
        );
        fireEvent.click(screen.getByText("Remove Google Account"));
        await waitFor(() => expect(localStorage.getItem("GoogleAccountToken")).toBeNull());
    });

    test("TUF36 - isTokenExpired returns true if token is expired", async () => {
        const TestComponent = (): JSX.Element => {
            const { addGoogleToken, isTokenExpired } = useContext(GoogleTokenContext)!;
            return (
                <div>
                    <button
                        onClick={() =>
                            void addGoogleToken({
                                token: "test-token",
                                refreshToken: "refresh",
                                expireDate: "2020-01-01T00:00:00Z"
                            })
                        }
                    >
                        Add Expired Google Account
                    </button>
                    <span>{isTokenExpired() ? "Expired" : "Valid"}</span>
                </div>
            );
        };

        render(
            <GoogleTokenProvider>
                <TestComponent />
            </GoogleTokenProvider>
        );

        fireEvent.click(screen.getByText("Add Expired Google Account"));
        await waitFor(() => expect(screen.getByText("Expired")).toBeInTheDocument());
    });

    test("TUF37 - isTokenExpired returns false if token is not expired", async () => {
        const TestComponent = (): JSX.Element => {
            const { addGoogleToken, isTokenExpired } = useContext(GoogleTokenContext)!;
            return (
                <div>
                    <button
                        onClick={() =>
                            void addGoogleToken({
                                token: "test-token",
                                refreshToken: "refresh",
                                expireDate: "2099-12-31T23:59:59Z"
                            })
                        }
                    >
                        Add Valid Google Account
                    </button>
                    <span>{isTokenExpired() ? "Expired" : "Valid"}</span>
                </div>
            );
        };

        render(
            <GoogleTokenProvider>
                <TestComponent />
            </GoogleTokenProvider>
        );

        fireEvent.click(screen.getByText("Add Valid Google Account"));
        await waitFor(() => expect(screen.getByText("Valid")).toBeInTheDocument());
    });
});

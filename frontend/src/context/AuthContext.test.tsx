import { expect, test, describe, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import { AuthContext, AuthProvider, User } from "./AuthContext";
import { useContext } from "react";

describe("AuthContext Login" , () => {
    const fetchSpy = vi.spyOn(window, 'fetch');

    beforeEach(() => {
        fetchSpy.mockReset();
        localStorage.clear();
    })

    test("Sets user.username when login succeds", async () => {
        interface CustomTestProps{
            username: string;
            password: string;
        }

        const CustomTest = ({username, password}: CustomTestProps) => {
            const context = useContext(AuthContext);
            if(!context) {
                throw new Error("Context is undefined");
            }
            
            const {user, loginUser} = context;
            return (
                <>
                    <div data-testid="user">{JSON.stringify(user?.username)}</div>
                    <button onClick={() => loginUser(username, password)} aria-label="login">
                        Login
                    </button>
                </>
            )
             
        }

        const accessToken = "testToken";

        const mockResolveValue = {
            status: 201,
            json: () => new Promise((resolve)=>resolve({accessToken}))
        };
        fetchSpy.mockResolvedValue(mockResolveValue as Response);

        const testUsername = "testUsername";
        const testPassword = "testPassword";
        render(<AuthProvider><CustomTest username={testUsername} password={testPassword}/></AuthProvider>);    
        expect(screen.getByTestId("user")).toBeEmptyDOMElement();
        fireEvent.click(screen.getByRole("button", {name: "login"}))
        await waitFor(()=>{
            expect(screen.getByTestId("user")).toHaveTextContent(testUsername);
        })
    })

    test("Sets user.accessToken when login succeds", async () => {
        interface CustomTestProps{
            username: string;
            password: string;
        }

        const CustomTest = ({username, password}: CustomTestProps) => {
            const context = useContext(AuthContext);
            if(!context) {
                throw new Error("Context is undefined");
            }
            
            const {user, loginUser} = context;
            return (
                <>
                    <div data-testid="token">{JSON.stringify(user?.accessToken)}</div>
                    <button onClick={() => loginUser(username, password)} aria-label="login">
                        Login
                    </button>
                </>
            )
             
        }

        const accessToken = "testToken";

        const mockResolveValue = {
            status: 201,
            json: () => new Promise((resolve)=>resolve({accessToken}))
        };
        fetchSpy.mockResolvedValue(mockResolveValue as Response);

        const testUsername = "testUsername";
        const testPassword = "testPassword";
        render(<AuthProvider><CustomTest username={testUsername} password={testPassword}/></AuthProvider>);    
        expect(screen.getByTestId("token")).toBeEmptyDOMElement();
        fireEvent.click(screen.getByRole("button", {name: "login"}))
        await waitFor(()=>{
            expect(screen.getByTestId("token")).toHaveTextContent(accessToken);
        })
    })

    test("Writes username and accessToken in localStorage when login succeds", async () => {
        interface CustomTestProps{
            username: string;
            password: string;
        }

        const CustomTest = ({username, password}: CustomTestProps) => {
            const context = useContext(AuthContext);
            if(!context) {
                throw new Error("Context is undefined");
            }
            
            const {loginUser} = context;
            return (
                <>
                    <button onClick={() => loginUser(username, password)} aria-label="login">
                        Login
                    </button>
                </>
            )
             
        }

        const accessToken = "testToken";

        const mockResolveValue = {
            status: 201,
            json: () => new Promise((resolve)=>resolve({accessToken}))
        };
        fetchSpy.mockResolvedValue(mockResolveValue as Response);

        const testUsername = "testUsername";
        const testPassword = "testPassword";
        const user = {username: testUsername, accessToken} as User;
        render(<AuthProvider><CustomTest username={testUsername} password={testPassword}/></AuthProvider>);    
        fireEvent.click(screen.getByRole("button", {name: "login"}))
        await waitFor(()=>{
            expect(localStorage.getItem("user")).toEqual(JSON.stringify(user));
        })
    })

    test("Sets error to 'Wrong username or password' when login fails due to wrong credentials", async () => {
        interface CustomTestProps{
            username: string;
            password: string;
        }

        const CustomTest = ({username, password}: CustomTestProps) => {
            const context = useContext(AuthContext);
            if(!context) {
                throw new Error("Context is undefined");
            }
            
            const {loginUser, error} = context;
            return (
                <>
                    <div data-testid="error">{error?.toString()}</div>
                    <button onClick={() => loginUser(username, password)} aria-label="login">
                        Login
                    </button>
                </>
            )
             
        }

        const mockResolveValue = {
            status: 400,
            json: () => new Promise((resolve)=>resolve("Wrong credentials"))
        };
        fetchSpy.mockResolvedValue(mockResolveValue as Response);

        const testUsername = "testUsername";
        const testPassword = "testPassword";
        render(<AuthProvider><CustomTest username={testUsername} password={testPassword}/></AuthProvider>);
        expect(screen.getByTestId("error")).toBeEmptyDOMElement();
        fireEvent.click(screen.getByRole("button", {name: "login"}))
        await waitFor(()=>{
            expect(screen.getByTestId("error")).toHaveTextContent(/Wrong username or password/);
        })
    })

    test("Sets empty user.username and user.accessToken when login fails due to wrong credentials", async () => {
        interface CustomTestProps{
            username: string;
            password: string;
        }

        const CustomTest = ({username, password}: CustomTestProps) => {
            const context = useContext(AuthContext);
            if(!context) {
                throw new Error("Context is undefined");
            }
            
            const {user, loginUser} = context;
            return (
                <>
                    <div data-testid="user">{JSON.stringify(user?.accessToken)}</div>
                    <div data-testid="token">{JSON.stringify(user?.accessToken)}</div>
                    <button onClick={() => loginUser(username, password)} aria-label="login">
                        Login
                    </button>
                </>
            )
             
        }

        const mockResolveValue = {
            status: 400,
            json: () => new Promise((resolve)=>resolve("Wrong credentials"))
        };
        fetchSpy.mockResolvedValue(mockResolveValue as Response);

        const testUsername = "testUsername";
        const testPassword = "testPassword";
        render(<AuthProvider><CustomTest username={testUsername} password={testPassword}/></AuthProvider>);
        expect(screen.getByTestId("user")).toBeEmptyDOMElement();
        expect(screen.getByTestId("token")).toBeEmptyDOMElement();
        fireEvent.click(screen.getByRole("button", {name: "login"}))
        await waitFor(()=>{
            expect(screen.getByTestId("user")).toBeEmptyDOMElement();
            expect(screen.getByTestId("token")).toBeEmptyDOMElement();
        })
    })
})
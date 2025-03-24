import { AuthContext, User } from "./AuthContext";
import { vi, Mock } from "vitest";

export interface AuthContextType {
    user: User | null;
    loginUser: Mock<(username: string, password: string) => Promise<void>>;
    logoutUser: Mock<() => void>;
    error: string | null;
}

export const MockedAuthProvider: React.FC<{ children: React.ReactNode } & AuthContextType> = ({ children, ...providerProps }) => {
    return <AuthContext.Provider value={providerProps}>{children}</AuthContext.Provider>;
};

//Se initiallyLoggedIn è true, riempie l'user con l'username e il token passati. Quando viene effettuato il login, viene impostato l'accessToken passato. Error è impostato al valore passato
// eslint-disable-next-line react-refresh/only-export-components
export const providerPropsInit = (
    initiallyLoggedIn: boolean = true,
    testUsername: string = "testUsername",
    testToken: string = "testToken",
    testError: string | null = null
): AuthContextType => {
    const providerProps = {
        user: initiallyLoggedIn ? ({ username: testUsername, accessToken: testToken } as User) : null,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        loginUser: vi.fn((username: string, _: string) => {
            providerProps.user = { username, accessToken: testToken };
        }),
        logoutUser: vi.fn(function () {
            providerProps.user = null;
        }),
        error: testError
    } as AuthContextType;
    return providerProps;
};

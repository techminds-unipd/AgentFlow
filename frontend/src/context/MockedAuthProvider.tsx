import { AuthContext, User } from "./AuthContext";
import { vi, Mock } from "vitest";
import { UserDTO } from "../services/dto/userDTO";

export interface AuthContextType {
    user: User | null;
    loginUser: Mock<(userDTO: UserDTO) => Promise<void>>;
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
    const userDTO = new UserDTO(testUsername, "testPassword");
    const providerProps = {
        user: initiallyLoggedIn ? ({ username: userDTO.username, accessToken: testToken } as User) : null,

        loginUser: vi.fn((userDTO: UserDTO) => {
            providerProps.user = { username: userDTO.username, accessToken: testToken };
        }),
        logoutUser: vi.fn(function () {
            providerProps.user = null;
        }),
        error: testError
    } as AuthContextType;
    return providerProps;
};

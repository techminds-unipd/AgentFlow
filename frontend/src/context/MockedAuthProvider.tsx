import { AuthContext, User } from "./AuthContext";
import {render} from "@testing-library/react";
import {vi, Mock} from "vitest"

export interface AuthContextType{
    user: User | null;
    loginUser: Mock<(username: string, password: string) => Promise<void>>;
    logoutUser: Mock<() => void>;
    error: string | null;
  }

export const authProviderRender = (ui: React.ReactNode, providerProps: AuthContextType) => {
return render(
    <AuthContext.Provider value={providerProps}>{ui}</AuthContext.Provider>
);
};

//Se initiallyLoggedIn è true, riempie l'user con l'username e il token passati. Quando viene effettuato il login, viene impostato l'accessToken passato. Error è impostato al valore passato
export const providerPropsInit = (initiallyLoggedIn = true, testUsername: string = "testUsername", testToken: string = "testToken", testError: string | null = null):AuthContextType => {
    const providerProps = {
      user: initiallyLoggedIn? {username: testUsername, accessToken: testToken} as User: null,
      loginUser: vi.fn((username: string, _: string) => {
        providerProps.user = {username, accessToken: testToken};
      }),
      logoutUser: vi.fn(function () {
        providerProps.user = null;
      }),
      error: testError,
  } as AuthContextType
  return providerProps;
}
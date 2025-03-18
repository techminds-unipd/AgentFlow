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


export const providerPropsInit = (testUsername: string = "testUsername", testToken: string = "testToken"):AuthContextType => {
    let providerProps = {
      user: {username: testUsername, accessToken: testToken} as User,
      loginUser: vi.fn((username: string, password: string) => {
        providerProps.user = {username, accessToken: "testToken"};
      }),
      logoutUser: vi.fn(function () {
        providerProps.user = null;
      }),
      error: null,
  } as AuthContextType
  return providerProps;
}
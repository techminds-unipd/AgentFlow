import { vi, Mock } from "vitest";
import { GoogleTokenContext, GoogleAccountToken } from "./GoogleTokenContext";

export interface GoogleAccountTokenType {
  googleToken: GoogleAccountToken | null;
  addGoogleToken: Mock<
    (googleTokenObject: GoogleAccountToken) => Promise<void>
  >;
  removeGoogleToken: Mock<() => void>;
  isTokenExpired: Mock<() => boolean>;
  error: string | null;
}

export const MockedGoogleTokenProvider:React.FC<{ children: React.ReactNode } & GoogleAccountTokenType> = ({ children, ...providerProps }) => {
  return (
    <GoogleTokenContext.Provider value={providerProps}>
      {children}
    </GoogleTokenContext.Provider>
  );
};

export const googleProviderPropsInit = (): GoogleAccountTokenType => {
  const providerProps = {
    googleToken: {
        token: "test-token",
        expireDate: "2023-12-31T23:59:59Z",
      },
    addGoogleToken: vi.fn((googleTokenObject: GoogleAccountToken) => {
      providerProps.googleToken = googleTokenObject;
    }),
    removeGoogleToken: vi.fn(function () {
      providerProps.googleToken = null;
    }),
    isTokenExpired: vi.fn(() => {
        if (!providerProps.googleToken) {
            return true;
        }
        const currentDate = new Date();
        const expireDate = new Date(providerProps.googleToken.expireDate);
        return currentDate > expireDate;
    }),
    error: null,
  } as GoogleAccountTokenType;
  return providerProps;
};

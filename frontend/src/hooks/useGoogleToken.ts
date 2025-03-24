import { useContext } from "react";
import { GoogleTokenContext, GoogleAccountTokenType } from "../context/GoogleTokenContext";

export const useGoogleToken = (): GoogleAccountTokenType => {
    const context = useContext(GoogleTokenContext);
    if (!context) throw new Error("useGoogleToken must be used within an GoogleTokenProvider");

    return context;
};

import { useContext } from "react";
import { AuthContext, AuthContextType } from "../context/AuthContext";

// useAuth ha lo scopo di semplificare l'accesso ai dati del contesto (ovvero user, loginUser, logoutUser e error)
// in questo modo possiamo evitare di scrivere ogni volta "const context = useContext(AuthContext);"

// hook personalizzato che permette ai componenti di accedere facilmente ai dati di autenticazione
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");

    return context;
};

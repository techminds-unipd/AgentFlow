import { createContext, useState, useEffect } from "react";
export interface GoogleAccountToken {
    token: string;
    expireDate: string;
}

export interface GoogleAccountTokenType {
    googleToken: GoogleAccountToken | null;
    addGoogleToken: (googleTokenObject: GoogleAccountToken) => void;
    removeGoogleToken: () => void;
    isTokenExpired: () => boolean;
    error: string | null;
}

// Memorizza e condivide lo stato tra i componenti
// eslint-disable-next-line react-refresh/only-export-components
export const GoogleTokenContext = createContext<GoogleAccountTokenType | undefined>(undefined);

// componente provider che avvolge l'App e fornisce i dati di autenticazione (i componenti children possono avere accesso al contenuto)
export const GoogleTokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Se l'utente ha effettuato il login con Google si recuperano i dati dal localStorage, altrimenti ritorna null
    const [googleToken, setGoogleToken] = useState<GoogleAccountToken | null>(() => {
        const storedToken = localStorage.getItem("GoogleAccountToken");
        if (storedToken !== null) return JSON.parse(storedToken) as GoogleAccountToken;
        else return null;
    });

    const [error, setError] = useState<string | null>(null);

    // controlla se il token è già salvato in localStorage al momento dell'avvio
    useEffect(() => {
        const storedToken = localStorage.getItem("GoogleAccountToken");
        if (storedToken !== null) setGoogleToken(JSON.parse(storedToken) as GoogleAccountToken);
    }, []);

    // chiama la funzione per aggiungere le informazioni dell'account e se avviene correttamente salva i dati in localStorage
    const addGoogleToken = (googleTokenObject: GoogleAccountToken): void => {
        try {
            localStorage.setItem("GoogleAccountToken", JSON.stringify(googleTokenObject));
            setGoogleToken(googleTokenObject);
            setError(null);
        } catch (err) {
            setError(err as string);
        }
    };

    // cancella i dati in localStorage
    const removeGoogleToken = (): void => {
        localStorage.removeItem("GoogleAccountToken");
        setGoogleToken(null);
    };

    const isTokenExpired = (): boolean => {
        if (!googleToken) return true;

        const currentDate = new Date();
        const expireDate = new Date(googleToken.expireDate);
        return currentDate > expireDate;
    };

    // ritorniamo user, loginUser, logoutUser e error a tutti i children
    return (
        <GoogleTokenContext.Provider value={{ googleToken, addGoogleToken, removeGoogleToken, isTokenExpired, error }}>
            {children}
        </GoogleTokenContext.Provider>
    );
};

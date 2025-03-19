import { createContext, useState, useEffect } from "react";
import { LoginService } from "../services/loginService";

// AuthProvider serve per garantire che tutte le info sull'autenticazione siano condivise in tutta l'app
// fornisce i dati di autenticazione a tutti i componenti figli tramite il contesto Context

export interface User {
    username: string;
    accessToken: string;
}

export interface AuthContextType {
    user: User | null;
    loginUser: (username: string, password: string) => Promise<void>;
    logoutUser: () => void;
    error: string | null;
}

// contenitore globale AuthContext che memorizza e condivide lo stato dell'utente tra i componenti
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// componente provider che avvolge l'App e fornisce i dati di autenticazione (i componenti children possono avere accesso al contenuto)
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // se l'utente è loggato si recuperano i dati dal localStorage, altrimenti ritorna null
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [error, setError] = useState<string | null>(null);

    const service = new LoginService();
    

    // controlla se l'utente è già salvato in localStorage al momento dell'avvio
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // chiama la funzione di login e se avviene correttamente salva i dati in localStorage
    const loginUser = async (username: string, password: string) => {
        try {
            const data = await service.login(username, password);
            const user = {username, accessToken: data.accessToken} as User;
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            setError(null);
        } catch (err) {
            setError(err as string);
        }
    };

    // cancella i dati in localStorage
    const logoutUser = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setUser(null);
    };

    // ritorniamo user, loginUser, logoutUser e error a tutti i children
    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser, error }}>
            {children}
        </AuthContext.Provider>
    );
};
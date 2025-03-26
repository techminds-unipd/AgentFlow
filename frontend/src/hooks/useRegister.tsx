import { useState } from "react";
import { RegisterService } from "../services/registerService";

interface UseRegister {
    registerUser: (username: string, password: string) => Promise<{ username: string; password: string } | null>;
    error: string | null;
}

export const useRegister = (
    registerService: RegisterService
): UseRegister => {
    const [error, setError] = useState<string | null>(null);

    const registerUser = async (username: string, password: string): Promise<{ username: string; password: string } | null> => {
        setError(null);

        try {
            const result = await registerService.register(username, password);
            return result;
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something went wrong.");
            return null;
        }
    };

    return { registerUser, error };
};

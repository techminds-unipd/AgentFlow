import { useState } from "react";
import { RegisterService } from "../services/RegisterService";
import { UserDTO } from "../services/dto/userDTO";

interface UseRegister {
    registerUser: (user: UserDTO) => Promise<{ user: UserDTO } | null>;
    error: string | null;
}

export const useRegister = (registerService: RegisterService): UseRegister => {
    const [error, setError] = useState<string | null>(null);

    const registerUser = async (user: UserDTO): Promise<{ user: UserDTO } | null> => {
        setError(null);

        try {
            const result = await registerService.register(user);
            return { user: result };
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something went wrong.");
            return null;
        }
    };

    return { registerUser, error };
};

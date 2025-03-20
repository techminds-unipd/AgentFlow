import { useState } from "react";
import { RegisterService } from "../services/registerService";

export const useRegister = () => {
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (username: string, password: string) => {
    setError(null);

    try {
        const service = new RegisterService();
        const result = await service.register(username, password); 
        console.log(result);
        return result;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  return { registerUser, error };
};
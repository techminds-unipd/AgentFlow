import { useState } from "react";
import { login } from "../services/api";

interface User {
  username: string;
}

interface AuthContext {
  user: User | null;
  loginUser: (username: string, password: string) => Promise<void>;
  logoutUser: () => void;
  error: string | null;
}

const useAuth = (): AuthContext => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (username: string, password: string) => {
    try {
      const data = await login(username, password);
      localStorage.setItem("accessToken", data.accessToken);
      console.log( data.accessToken );
      setUser({ username });
      setError(null);
    } catch (err) {
      setError(err as string);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return { user, loginUser, logoutUser, error };
};

export default useAuth;
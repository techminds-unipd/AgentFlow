import { API_BASE_URL } from "./constants";

interface RegisterResponse {
    username: string;
    password: string;
}

export class RegisterService {
    public async register(username: string, password: string): Promise<RegisterResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/user/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            if (response.status === 201) return (await response.json()) as RegisterResponse;
            else if (response.status === 400) throw new Error("Username already exists");
            else if (response.status >= 500) throw new Error("Server error");
            else throw new Error("Generic error");
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Generic error");
        }
    }
}

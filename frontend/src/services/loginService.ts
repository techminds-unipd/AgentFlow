import { API_BASE_URL } from "./constants";
import { UserDTO } from "./dto/UserDto";

interface LoginResponse {
    accessToken: string;
}

export class LoginService {
    public async login(user: UserDTO): Promise<LoginResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/user/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            if (response.status === 201) return (await response.json()) as LoginResponse;
            else if (response.status === 400 || response.status === 401) throw new Error("wrong username or password");
            else if (response.status >= 500) throw new Error("Server error");
            else throw new Error("Generic error");
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Generic error");
        }
    }
}

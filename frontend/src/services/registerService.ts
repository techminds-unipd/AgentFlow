import { API_BASE_URL } from "./constants";
import { UserDTO } from "./dto/UserDto";

export class RegisterService {
    public async register(user: UserDTO): Promise<UserDTO> {
        try {
            const response = await fetch(`${API_BASE_URL}/user/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            if (response.status === 201) return (await response.json()) as UserDTO;
            else if (response.status === 400) throw new Error("Username already exists");
            else if (response.status >= 500) throw new Error("Server error");
            else throw new Error("Generic error");
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Generic error");
        }
    }
}

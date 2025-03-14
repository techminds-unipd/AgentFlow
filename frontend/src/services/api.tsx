const API_BASE_URL = "http://localhost:3000"; // URL dell'API documentata in Swagger

interface LoginResponse {
  accessToken: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 400) {
      throw new Error("Wrong username or password");
    } else if (response.status >= 500) {
      throw new Error("Server error");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Errore generico");
  }
};
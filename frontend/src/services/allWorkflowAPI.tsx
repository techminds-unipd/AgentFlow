const API_BASE_URL = "http://localhost:3000";

export interface allWorkflowResponse extends Array<string> {}

export const allWorkflow = async (): Promise<allWorkflowResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/workflow/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // quando ci sarà il login finito qua andrà l'accessoToken dato da useAuth (user.accessToken)
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByb3ZhIiwiaWF0IjoxNzQyMjI2MDM4LCJleHAiOjE3NDIyNjIwMzh9.ryI-4A1NhG1U6pi89sXAdSYD_gDHecErkjeJr3MeMyk`, 
      },
    });

    if (response.status === 400) {
      throw new Error("Something wrong");
    } else if (response.status >= 500) {
      throw new Error("Server error");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Errore generico");
  }
};
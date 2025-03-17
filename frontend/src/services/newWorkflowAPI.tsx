const API_BASE_URL = "http://localhost:3000";

interface newWorkflowResponse {
  name: string;
}

export const newWorkflow = async (name: string): Promise<newWorkflowResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/workflow/create/${name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // quando ci sarà il login finito qua andrà l'accessoToken dato da useAuth (user.accessToken)
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByb3ZhIiwiaWF0IjoxNzQyMjAxNjM1LCJleHAiOjE3NDIyMzc2MzV9.3Zi-JYFuiDwC0cc3RUG2z5nB8d6gjrXudc0VUD4MfaI`, 
      },
      body: JSON.stringify({ name }),
    });

    if (response.status === 400) {
      throw new Error("Workflow with this name already exists");
    } else if (response.status >= 500) {
      throw new Error("Server error");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Errore generico");
  }
};
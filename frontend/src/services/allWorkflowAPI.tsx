const API_BASE_URL = "http://localhost:3000";

interface allWorkflowResponse extends Array<string> {}

export const allWorkflow = async (): Promise<allWorkflowResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/workflow/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // quando ci sarà il login finito qua andrà l'accessoToken dato da useAuth (user.accessToken)
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByb3ZhIiwiaWF0IjoxNzQyMjAxNjM1LCJleHAiOjE3NDIyMzc2MzV9.3Zi-JYFuiDwC0cc3RUG2z5nB8d6gjrXudc0VUD4MfaI`, 
      },
    });

    if (response.status === 400) {
      throw new Error("Something wrong");
    } else if (response.status >= 500) {
      throw new Error("Server error");
    }

    const data = await response.json();
    console.log("WorkflowList data:", data);
    console.log("Type of names:", Array.isArray(data?.names));
    
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Errore generico");
  }
};
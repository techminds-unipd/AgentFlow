const API_BASE_URL = "http://localhost:3000";

interface deleteWorkflowResponse {
  name: string;
}

export const deleteWorkflowByName = async (name: string): Promise<deleteWorkflowResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/workflow/delete/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // quando ci sarà il login finito qua andrà l'accessoToken dato da useAuth (user.accessToken)
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByb3ZhIiwiaWF0IjoxNzQyMjAxNjM1LCJleHAiOjE3NDIyMzc2MzV9.3Zi-JYFuiDwC0cc3RUG2z5nB8d6gjrXudc0VUD4MfaI`, 
      },
    });

    console.log("mi hann chiamata");
    if (response.status === 400) {
      throw new Error("Some error");
    } else if (response.status >= 500) {
      throw new Error("Server error");
    }
    console.log("mi hann chiamata");
    const data= await response.json();
    console.log("ciao", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error(error instanceof Error ? error.message : "Errore generico");
  }
};
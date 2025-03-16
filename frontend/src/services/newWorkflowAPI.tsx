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
        // quando ci sarà il login finito qua andrà l'accessoToken memorizzato in localStorage
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByb3ZhIiwiaWF0IjoxNzQyMTM0MTcyLCJleHAiOjE3NDIxNzAxNzJ9.44loplnJf1jqA-h4KYDf9nk4Lzm0TJXrWAItvhTVVIU`, 
      },
      body: JSON.stringify({ name }),
    });

    console.log("Response status: ", response.status);
    console.log("Response body: ", await response.text());

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
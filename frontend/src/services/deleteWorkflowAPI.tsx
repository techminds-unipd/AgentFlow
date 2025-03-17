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
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByb3ZhIiwiaWF0IjoxNzQyMjI2MDM4LCJleHAiOjE3NDIyNjIwMzh9.ryI-4A1NhG1U6pi89sXAdSYD_gDHecErkjeJr3MeMyk`, 
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
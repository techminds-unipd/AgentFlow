const API_BASE_URL = "http://localhost:3000";

interface deleteWorkflowResponse {
  name: string;
  accessToken: string;
}

export const deleteWorkflowByName = async (name: string, accessToken: string): Promise<deleteWorkflowResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/workflow/delete/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`, 
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
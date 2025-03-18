export const API_BASE_URL = "http://localhost:3000";

interface deleteWorkflowResponse {
  name: string;
  accessToken: string;
}

export const deleteWorkflowByName = async (name: string, accessToken: string): Promise<deleteWorkflowResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/workflow/delete/${name}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`, 
      },
    });

    if (response.status === 400) {
      throw new Error("Some error");
    } else if (response.status >= 500) {
      throw new Error("Server error");
    }
    const data= await response.json();
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Generic error");
  }
};
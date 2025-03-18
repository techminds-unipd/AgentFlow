export const API_BASE_URL = "http://localhost:3000";

export interface allWorkflowResponse extends Array<string> {
  accessToken: string;
}

export const allWorkflow = async (accessToken: string): Promise<allWorkflowResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/workflow/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`, 
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
export const API_BASE_URL = "http://localhost:3000";

interface newWorkflowResponse {
  name: string;
}

export const newWorkflow = async (name: string, accessToken: string): Promise<newWorkflowResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/workflow/create/${name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`, 
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
    throw new Error(error instanceof Error ? error.message : "Generic Error");
  }
};
export const API_BASE_URL = "http://localhost:3000";

interface deleteWorkflowResponse {
  name: string;
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

    if(response.status == 200){
      return await response.json();
    }else if (response.status === 404) {
      throw new Error("workflow not found");
    } else if (response.status >= 500) {
      throw new Error("Server error");
    }else{
      throw new Error("Generic error");
    }

  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Generic error");
  }
};
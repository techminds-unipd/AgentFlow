import { API_BASE_URL } from "./constants";

export const allWorkflows = async (accessToken: string): Promise<Array<string>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/workflow/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`, 
      },
    });

    if(response.status === 200){
      return await response.json();
    }else if (response.status === 400) {
      throw new Error("User not found");
    } else if (response.status >= 500) {
      throw new Error("Server error");
    }else{
      throw new Error("Generic error");
    }
    
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Errore generico");
  }
};
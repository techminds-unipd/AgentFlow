import { API_BASE_URL } from "./constants";

export interface CreateWorkflowResponse {
    name: string;
}

export class CreateWorkflowService {
    public async newWorkflow(name: string, accessToken: string): Promise<CreateWorkflowResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/workflow/create/${name}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
                body: JSON.stringify({ name })
            });

            if (response.status === 201) return (await response.json()) as CreateWorkflowResponse;
            else if (response.status === 400) throw new Error("Workflow with the same name already exists");
            else if (response.status >= 500) throw new Error("Server error");
            else throw new Error("Generic error");
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Generic Error");
        }
    }
}

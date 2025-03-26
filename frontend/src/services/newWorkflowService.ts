import { API_BASE_URL } from "./constants";

export interface NewWorkflowResponse {
    name: string;
}

export class NewWorkflowService {
    private readonly accessToken: string;

    public constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    public async newWorkflow(name: string): Promise<NewWorkflowResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/workflow/create/${name}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.accessToken}` },
                body: JSON.stringify({ name })
            });

            if (response.status === 201) return (await response.json()) as NewWorkflowResponse;
            else if (response.status === 400) throw new Error("Workflow with the same name already exists");
            else if (response.status >= 500) throw new Error("Server error");
            else throw new Error("Generic error");
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Generic Error");
        }
    }
}

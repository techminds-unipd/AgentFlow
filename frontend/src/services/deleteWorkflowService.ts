import { API_BASE_URL } from "./constants";

export interface DeleteWorkflowResponse {
    name: string;
}

export class DeleteWorkflowService {
    private readonly accessToken: string;

    public constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    public async deleteWorkflowByName(name: string): Promise<DeleteWorkflowResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/workflow/delete/${name}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.accessToken}` }
            });

            if (response.status === 200) return (await response.json()) as DeleteWorkflowResponse;
            else if (response.status === 404) throw new Error("workflow not found");
            else if (response.status >= 500) throw new Error("Server error");
            else throw new Error("Generic error");
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Generic error");
        }
    }
}

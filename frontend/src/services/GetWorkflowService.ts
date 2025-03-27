import { API_BASE_URL } from "./Constants";
import { WorkflowDTO } from "./dto/WorkflowDTO";

export class GetWorkflowService {
    async getWorkflow(name: string, accessToken: string): Promise<WorkflowDTO> {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` }
        };
        const response = await fetch(`${API_BASE_URL}/workflow/get/${name}`, requestOptions);
        const data = (await response.json()) as { name: string; nodes: []; edges: []; message: string };

        if (response.status === 200) return new WorkflowDTO(data.name, data.nodes, data.edges);
        else throw new Error(data.message);
    }
}

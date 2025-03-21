import { API_BASE_URL } from "./constants";
import { WorkflowDTO } from "./dto/WorkflowDTO";

export class SaveWorkflowService {
  async saveWorkflow(workflow: WorkflowDTO, accessToken: string): Promise<WorkflowDTO> {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify(workflow)
    };

    const response = await fetch(`${API_BASE_URL}/workflow/save`, requestOptions)
    const data = await response.json();

    if (response.status === 200) {
      return new WorkflowDTO(data.name, data.nodes, data.edges);
    } else {
        throw new Error(data.message)
    }

  }
}

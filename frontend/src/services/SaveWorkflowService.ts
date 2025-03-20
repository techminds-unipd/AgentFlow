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

    return fetch(`${API_BASE_URL}/workflow/save`, requestOptions)
      .then(response => response.json())
      .then(data => new WorkflowDTO(data.name, data.nodes, data.edges))
      .catch(_ => { throw new Error() });
  }
}

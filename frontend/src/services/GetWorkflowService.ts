import { API_BASE_URL } from "./constants";
import { WorkflowDTO } from "./dto/WorkflowDTO";

export class GetWorkflowService {
    async getWorkflow(name: string, accessToken: string): Promise<WorkflowDTO> {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${accessToken}`,
      }
    };

    return fetch(`${API_BASE_URL}/workflow/get/${name}`, requestOptions)
      .then(response => response.json())
      .then(data => new WorkflowDTO(data.name, data.nodes, data.edges))
      .catch(_ => { throw new Error()});

  }
}

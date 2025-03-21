import { API_BASE_URL } from "./constants";
import { WorkflowDTO } from "./dto/WorkflowDTO";

export class ExecuteWorkflowService {
    async executeWorkflow(workflow: WorkflowDTO, accessToken: string): Promise<WorkflowDTO> {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${accessToken}`,
      },
        body: JSON.stringify({workflow: workflow})
    };


    return fetch(`${API_BASE_URL}/workflow/execute`, requestOptions)
      .then(response => response.json())
      .then(data => new WorkflowDTO(data.name, data.nodes, data.edges))
      .catch(_ => { throw new Error() });

  }
}

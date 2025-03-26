import { GoogleAccountToken } from "../context/GoogleTokenContext";
import { API_BASE_URL } from "./constants";
import { WorkflowDTO } from "./dto/WorkflowDTO";

export class ExecuteWorkflowService {
    async executeWorkflow(workflow: WorkflowDTO, accessToken: string, googleToken: GoogleAccountToken): Promise<string> {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
            body: JSON.stringify({
                workflow: workflow,
                googleToken: {
                    token: googleToken.token,
                    refreshToken: googleToken.refreshToken,
                    expireDate: googleToken.expireDate
                }
            })
        };
        const response = await fetch(`${API_BASE_URL}/workflow/execute`, requestOptions);

        if (response.status === 201) {
            const data = await response.text();
            return data;
        } else throw new Error(((await response.json()) as { message: string }).message);
    }
}

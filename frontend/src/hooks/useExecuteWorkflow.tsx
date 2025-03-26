import { useAuth } from "./useAuth";
import { WorkflowDTO } from "../services/dto/WorkflowDTO";
import { ExecuteWorkflowService } from "../services/ExecuteWorkflowService";
import { useGoogleToken } from "./useGoogleToken";

export const useExecuteWorkflow = (executeWorkflowService: ExecuteWorkflowService) => {
    const { user } = useAuth();
    const google = useGoogleToken();

    const executeWorkflow = async (workflow: WorkflowDTO) => {
        if (user !== null && google.googleToken !== null) {
            const result = await executeWorkflowService.executeWorkflow(workflow, user.accessToken, google.googleToken);
            return result;
        }
        throw new Error("Connect you Google account first!");
    };

    return executeWorkflow;
};

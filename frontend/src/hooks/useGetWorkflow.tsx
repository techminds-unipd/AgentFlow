import { useAuth } from "./useAuth";
import { GetWorkflowService } from "../services/GetWorkflowService";
import { WorkflowDTO } from "../services/dto/WorkflowDTO";

export const useGetWorkflow = (getWorkflowService: GetWorkflowService): ((name: string) => Promise<WorkflowDTO>) => {
    const { user } = useAuth();

    const getWorkflow = async (name: string): Promise<WorkflowDTO> => {
        if (user !== null) {
            const result = await getWorkflowService.getWorkflow(name, user.accessToken);
            return result;
        }
        throw new Error("Not authenticated");
    };

    return getWorkflow;
};

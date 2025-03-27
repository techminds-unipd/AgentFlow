import { useAuth } from "./useAuth";
import { GetWorkflowService } from "../services/GetWorkflowService";
import { WorkflowDTO } from "../services/dto/WorkflowDTO";

export const useGetWorkflow = (getWorkflowService: GetWorkflowService): ((name: string) => Promise<WorkflowDTO | undefined>) => {
    const { user } = useAuth();

    const getWorkflow = async (name: string): Promise<WorkflowDTO | undefined> => {
        if (user !== null) {
            const result = await getWorkflowService.getWorkflow(name, user.accessToken);
            return result;
        }
    };

    return getWorkflow;
};

import { useAuth } from "./useAuth";
import { GetWorkflowService } from "../services/GetWorkflowService";

export const useGetWorkflow = (getWorkflowService: GetWorkflowService) => {
    const { user } = useAuth();

    const getWorkflow = async (name: string) => {
        if (user !== null) {
            const result = await getWorkflowService.getWorkflow(name, user.accessToken);
            return result;
        }
    };

    return getWorkflow;
};

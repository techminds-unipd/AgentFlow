import { useAuth } from "./useAuth";
import { SaveWorkflowService } from "../services/SaveWorkflowService";
import { WorkflowDTO } from "../services/dto/WorkflowDTO";

export const useSaveWorkflow = (saveWorkflowService: SaveWorkflowService): ((workflow: WorkflowDTO) => Promise<WorkflowDTO>) => {
    const { user } = useAuth();

    const saveWorkflow = async (workflow: WorkflowDTO): Promise<WorkflowDTO> => {
        if (user !== null) {
            const result = await saveWorkflowService.saveWorkflow(workflow, user.accessToken);
            return result;
        }
        throw new Error("Not authenticated");
    };

    return saveWorkflow;
};

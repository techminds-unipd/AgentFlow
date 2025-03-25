import { useAuth } from "./useAuth";
import { SaveWorkflowService } from "../services/SaveWorkflowService";
import { WorkflowDTO } from "../services/dto/WorkflowDTO";

export const useSaveWorkflow = (saveWorkflowService: SaveWorkflowService) => {
    const { user } = useAuth();

  const saveWorkflow = async (workflow: WorkflowDTO) => {
      if (user !== null) {
        const result = await saveWorkflowService.saveWorkflow(workflow, user!.accessToken);
        return result;
      }
  };

  return saveWorkflow;
};

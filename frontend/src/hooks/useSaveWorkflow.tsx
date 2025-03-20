import { useState } from "react";
import { useAuth } from "./useAuth";
import { SaveWorkflowService } from "../services/SaveWorkflowService";
import { WorkflowDTO } from "../services/dto/WorkflowDTO";

export const useSaveWorkflow = (saveWorkflowService: SaveWorkflowService) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const saveWorkflow = async (workflow: WorkflowDTO) => {
    setIsLoading(true);
    setError(null);

    try {
      if (user !== null) {
        const result = await saveWorkflowService.saveWorkflow(workflow, user!.accessToken);
        return result;
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return { saveWorkflow, isLoading, error };
};

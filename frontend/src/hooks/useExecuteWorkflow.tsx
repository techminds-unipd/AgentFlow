import { useState } from "react";
import { useAuth } from "./useAuth";
import { WorkflowDTO } from "../services/dto/WorkflowDTO";
import { ExecuteWorkflowService } from "../services/ExecuteWorkflowService";

export const useExecuteWorkflow = (executeWorkflowService: ExecuteWorkflowService) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const executeWorkflow = async (workflow: WorkflowDTO) => {
    setIsLoading(true);
    setError(null);

    try {
      if (user !== null) {
        const result = await executeWorkflowService.executeWorkflow(workflow, user!.accessToken);
        return result;
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return { executeWorkflow, isLoading, error };
};

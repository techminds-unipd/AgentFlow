import { useState } from "react";
import { useAuth } from "./useAuth";
import { GetWorkflowService } from "../services/GetWorkflowService";

export const useGetWorkflow = (getWorkflowService: GetWorkflowService) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const getWorkflow = async (name: string) => {
    setIsLoading(true);
    setError(null);

    try {
      if (user !== null) {
        const result = await getWorkflowService.getWorkflow(name, user!.accessToken);
        return result;
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return { getWorkflow, isLoading, error };
};

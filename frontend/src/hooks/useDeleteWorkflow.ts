import { useState } from "react";
import { DeleteWorkflowService } from "../services/deleteWorkflowService";
import { useAuth } from "./useAuth";

export const useDeleteWorkflow = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const deleteWorkflow = async (name: string) => {
    setIsLoading(true);
    setError(null);

    try {
      if(user!==null){
        const service = new DeleteWorkflowService(user?.accessToken);
        const result = await service.deleteWorkflowByName(name); 
        return result;
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteWorkflow, isLoading, error };
};
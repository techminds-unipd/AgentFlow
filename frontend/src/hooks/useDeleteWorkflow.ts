import { useState } from "react";
import { deleteWorkflowByName } from "../services/deleteWorkflowAPI";
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
        const result = await deleteWorkflowByName(name, user?.accessToken); 
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
import { useState } from "react";
import { deleteWorkflowByName } from "../services/deleteWorkflowAPI";
import { useAuth } from "../hooks/useAuth";

export const useDeleteWorkflow = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const deleteWorkflow = async (name: string) => {
    setIsLoading(true);
    setError(null);

    try {
    console.log("ciao");
      const result = await deleteWorkflowByName(name, user?.accessToken); 
      console.log("ciao-dopo");
      return result;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteWorkflow, isLoading, error };
};
import { useState } from "react";
import { newWorkflow } from "../services/newWorkflowAPI";
import { useAuth } from "../hooks/useAuth";

export const useCreateWorkflow = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const createWorkflow = async (name: string) => {
    setIsLoading(true);
    setError(null);
    

    try {
      const result = await newWorkflow(name, user?.accessToken); 
      return result;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return { createWorkflow, isLoading, error };
};
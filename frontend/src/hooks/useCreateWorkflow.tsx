import { useState } from "react";
import { newWorkflow } from "../services/newWorkflowAPI";

export const useCreateWorkflow = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createWorkflow = async (name: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await newWorkflow(name);
      return result;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return { createWorkflow, isLoading, error };
};
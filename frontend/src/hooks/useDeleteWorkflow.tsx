import { useState } from "react";
import { deleteWorkflowByName } from "../services/deleteWorkflowAPI";

export const useDeleteWorkflow = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteWorkflow = async (name: string) => {
    setIsLoading(true);
    setError(null);

    try {
    console.log("ciao");
      const result = await deleteWorkflowByName(name);
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
import { useState, useEffect } from "react";
import { allWorkflow } from "../services/allWorkflowAPI";

interface allWorkflowResponse extends Array<string> {}
  
  export const useAllWorkflow = () => {
    const [workflowList, setData] = useState<allWorkflowResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchWorkflows = async () => {
        setIsLoading(true);
        setError(null);
  
        try {
          const result = await allWorkflow();
          setData(result);
        } catch (error) {
          setError(error instanceof Error ? error.message : "Something went wrong.");
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchWorkflows();
    }, []);
  
    return { workflowList, isLoading, error };
  };
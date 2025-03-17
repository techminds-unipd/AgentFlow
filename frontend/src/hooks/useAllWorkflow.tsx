import { useState, useEffect } from "react";
import { allWorkflow, allWorkflowResponse } from "../services/allWorkflowAPI";
import { useAuth } from "../hooks/useAuth"; 

export const useAllWorkflow = () => {
  const [workflowList, setData] = useState<allWorkflowResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  
  const fetchWorkflows = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await allWorkflow(user?.accessToken); 
      setData(result);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  return { workflowList, isLoading, error, refetch: fetchWorkflows, };
};
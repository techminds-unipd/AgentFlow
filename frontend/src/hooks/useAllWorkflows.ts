import { useState, useEffect } from "react";
import { AllWorkflowsService } from "../services/allWorkflowsService";
import { useAuth } from "./useAuth";

export const useAllWorkflow = () => {
    const [workflowList, setData] = useState<Array<string> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const fetchWorkflows = async () => {
        setIsLoading(true);
        setError(null);

        try {
            if (user !== null) {
                const service = new AllWorkflowsService(user?.accessToken);
                const result = await service.allWorkflows();
                setData(result);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkflows();
    }, []);

    return { workflowList, isLoading, error, refetch: fetchWorkflows };
};

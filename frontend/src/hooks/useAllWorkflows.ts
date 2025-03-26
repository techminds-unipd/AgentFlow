import { useState, useEffect } from "react";
import { AllWorkflowsService } from "../services/AllWorkflowsService";
import { useAuth } from "./useAuth";

interface IUseAllWorkflow {
    workflowList: string[] | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useAllWorkflow = (
    allWorkflowsService: AllWorkflowsService
): IUseAllWorkflow => {
    const [workflowList, setData] = useState<Array<string> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const fetchWorkflows = async (): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            if (user !== null) {
                const result = await allWorkflowsService.allWorkflows(user.accessToken);
                setData(result);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void fetchWorkflows();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { workflowList, isLoading, error, refetch: fetchWorkflows };
};

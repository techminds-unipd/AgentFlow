import { useState } from "react";
import { NewWorkflowService, NewWorkflowResponse } from "../services/newWorkflowService";
import { useAuth } from "./useAuth";

interface IUseCreateWorkflow {
    createWorkflow: (name: string) => Promise<NewWorkflowResponse | undefined>;
    isLoading: boolean;
    error: string | null;
}

export const useCreateWorkflow = (): IUseCreateWorkflow => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const createWorkflow = async (name: string): Promise<NewWorkflowResponse | undefined> => {
        setIsLoading(true);
        setError(null);

        try {
            if (user !== null) {
                const service = new NewWorkflowService(user?.accessToken);
                const result = await service.newWorkflow(name);
                return result;
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    return { createWorkflow, isLoading, error };
};

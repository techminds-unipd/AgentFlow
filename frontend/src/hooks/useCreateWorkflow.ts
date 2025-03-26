import { useState } from "react";
import { CreateWorkflowService, CreateWorkflowResponse } from "../services/CreateWorkflowService";
import { useAuth } from "./useAuth";

interface IUseCreateWorkflow {
    createWorkflow: (name: string) => Promise<CreateWorkflowResponse | undefined>;
    isLoading: boolean;
    error: string | null;
}

export const useCreateWorkflow = (
    createWorkflowsService: CreateWorkflowService
): IUseCreateWorkflow => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const createWorkflow = async (name: string): Promise<CreateWorkflowResponse | undefined> => {
        setIsLoading(true);
        setError(null);

        try {
            if (user !== null) {
                const result = await createWorkflowsService.newWorkflow(name, user.accessToken);
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

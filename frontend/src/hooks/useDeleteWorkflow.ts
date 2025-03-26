import { useState } from "react";
import { DeleteWorkflowService, DeleteWorkflowResponse } from "../services/deleteWorkflowService";
import { useAuth } from "./useAuth";

interface IUseDeleteWorkflow {
    deleteWorkflow: (name: string) => Promise<DeleteWorkflowResponse | undefined>;
    isLoading: boolean;
    error: string | null;
}

export const useDeleteWorkflow = (
    deleteWorkflowService: DeleteWorkflowService
): IUseDeleteWorkflow => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const deleteWorkflow = async (name: string): Promise<DeleteWorkflowResponse | undefined> => {
        setIsLoading(true);
        setError(null);

        try {
            if (user !== null) {
                const result = await deleteWorkflowService.deleteWorkflowByName(name, user.accessToken);
                return result;
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    return { deleteWorkflow, isLoading, error };
};

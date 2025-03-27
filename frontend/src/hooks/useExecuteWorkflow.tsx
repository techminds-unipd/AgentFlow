import { useAuth } from "./useAuth";
import { WorkflowDTO } from "../services/dto/WorkflowDTO";
import { ExecuteWorkflowService } from "../services/ExecuteWorkflowService";
import { useGoogleToken } from "./useGoogleToken";
import { useState } from "react";

interface UseExecuteWorkflowInterface {
    executeWorkflow: (workflow: WorkflowDTO) => Promise<string>;
    isLoading: boolean;
}

export const useExecuteWorkflow = (executeWorkflowService: ExecuteWorkflowService): UseExecuteWorkflowInterface => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const google = useGoogleToken();

    const executeWorkflow = async (workflow: WorkflowDTO): Promise<string> => {
        try {
            setIsLoading(true);
            if (user !== null && google.googleToken !== null)
                return await executeWorkflowService.executeWorkflow(workflow, user.accessToken, google.googleToken);

            throw new Error("Connect you Google account first!");
        } finally {
            setIsLoading(false);
        }
    };

    return { executeWorkflow, isLoading };
};

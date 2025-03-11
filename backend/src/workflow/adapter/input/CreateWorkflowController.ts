import { Controller, HttpException, HttpStatus, Inject, Param, Post } from "@nestjs/common";
import { CREATE_WORKFLOW_USE_CASE, CreateWorkflowUseCase } from "src/workflow/service/port/input/CreateWorkflowUseCase";
import { WorkflowDTO } from "./WorkflowDTO";
import { Workflow } from "src/workflow/domain/Workflow";
import CreateWorkflowCommand from "src/workflow/domain/CreateWorkflowCommand";
import { WorkflowAlreadyExistsError, WorkflowNotAddedError } from "src/BusinessErrors";

@Controller("workflow")
class CreateWorkflowController {
    constructor(
        @Inject(CREATE_WORKFLOW_USE_CASE) private readonly createWorkflowUseCase: CreateWorkflowUseCase
    ) {}

    private toDomain(workflowName: string): CreateWorkflowCommand {
        // serve controllare il JWT e ricavare lo username
        return new CreateWorkflowCommand(workflowName, "username");
    }

    private toDTO(workflow: Workflow): WorkflowDTO {
        return new WorkflowDTO(workflow.name, [], []);
    }

    @Post("/create/:name")
    async createWorkflow(@Param("name") workflowName: string): Promise<WorkflowDTO> {
        const cmd = this.toDomain(workflowName);
        try {
            const workflow = await this.createWorkflowUseCase.createWorkflow(cmd);
            return this.toDTO(workflow);
        } catch (err) {
            if (err instanceof WorkflowAlreadyExistsError)
                throw new HttpException("Workflow with the same name already exists", HttpStatus.BAD_REQUEST);
            if (err instanceof WorkflowNotAddedError)
                throw new HttpException("Workflow not added", HttpStatus.INTERNAL_SERVER_ERROR);

            throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export default CreateWorkflowController;

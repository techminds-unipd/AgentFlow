import { Controller, HttpException, HttpStatus, Inject, Post, UseGuards, Body } from "@nestjs/common";
import { AuthGuard } from "./AuthGuard";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import ExecuteWorkflowDTO from "./ExecuteWorkflowDTO";
import { EXECUTE_WORKFLOW_USE_CASE, ExecuteWorkflowUseCase } from "src/workflow/service/port/input/ExecuteWorkflowUseCase";
import ExecuteWorkflowCommand from "src/workflow/domain/ExecuteWorkflowCommand";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom } from "rxjs";
import WorkflowDTOValidator from "./WorkflowDTOValidator";
import WorkflowAdapterImplementation from "./WorkflowAdapterImplementation";

@ApiBearerAuth()
@Controller("workflow")
class ExecuteWorkflowController {
    constructor(
        @Inject(EXECUTE_WORKFLOW_USE_CASE) private readonly executeWorkflowUseCase: ExecuteWorkflowUseCase,
        private readonly httpService: HttpService,
        private readonly workflowDTOValidator: WorkflowDTOValidator,
        private readonly workflowAdapterImplementation: WorkflowAdapterImplementation
    ) {}

    private async validate(accessToken: string): Promise<void> {
        await firstValueFrom(
            this.httpService.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`).pipe(
                catchError(() => {
                    throw new HttpException("Invalid google token", HttpStatus.UNAUTHORIZED);
                })
            )
        );
    }

    @UseGuards(AuthGuard)
    @Post("/execute")
    @ApiResponse({ status: 201, description: "Workflow executed successfully" })
    @ApiResponse({ status: 412, description: "Invalid workflow" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async executeWorkflow(@Body() executeReq: ExecuteWorkflowDTO): Promise<string> {
        this.workflowDTOValidator.validate(executeReq.workflow);
        await this.validate(executeReq.googleToken.token);
        const workflow = this.workflowAdapterImplementation.toDomain(executeReq.workflow);
        const cmd = new ExecuteWorkflowCommand(workflow, executeReq.googleToken);
        try {
            return await this.executeWorkflowUseCase.executeWorkflow(cmd);
        } catch {
            throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export default ExecuteWorkflowController;

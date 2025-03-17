import { Controller, HttpException, HttpStatus, Inject, Post, UseGuards, Body } from "@nestjs/common";
import { WorkflowDTO } from "./WorkflowDTO";
import { Node, NodeType, Point, Workflow } from "src/workflow/domain/Workflow";
import { AuthGuard } from "./AuthGuard";
import { ApiBearerAuth } from "@nestjs/swagger";
import ExecuteWorkflowDTO from "./ExecuteWorkflowDTO";
import { EXECUTE_WORKFLOW_USE_CASE, ExecuteWorkflowUseCase } from "src/workflow/service/port/input/ExecuteWorkflowUseCase";
import ExecuteWorkflowCommand from "src/workflow/domain/ExecuteWorkflowCommand";
import { isNotIn } from "class-validator";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom } from "rxjs";
import WorkflowDTOValidator from "./WorkflowDTOValidator";

@ApiBearerAuth()
@Controller("workflow")
class ExecuteWorkflowController {
    constructor(
        @Inject(EXECUTE_WORKFLOW_USE_CASE) private readonly executeWorkflowUseCase: ExecuteWorkflowUseCase,
        private readonly httpService: HttpService,
        private readonly workflowDTOValidator: WorkflowDTOValidator
    ) {}

    // uguale ad altri
    /*eslint-disable max-statements*/
    private toDomain(workflowDto: WorkflowDTO): Workflow {
        const workflow: Workflow = new Workflow(workflowDto.name, []);
        let firstNode = undefined;
        const target = workflowDto.edges.map((edge) => edge.target);
        for (let i = 0; i < workflowDto.nodes.length && !firstNode; i++)
            if (isNotIn(workflowDto.nodes[i].id, target)) firstNode = workflowDto.nodes[i];
        let nextNode = firstNode;
        let edge = workflowDto.edges.find((edge) => edge.source === nextNode!.id);
        workflow.nodes.push(
            new Node(nextNode!.data.label as NodeType, edge!.label, new Point(nextNode!.position.x, nextNode!.position.y))
        );
        let action: string;
        for (let i = 0; i < workflowDto.nodes.length - 1; i++) {
            nextNode = workflowDto.nodes.find((node) => node.id === edge!.target);
            edge = workflowDto.edges.find((edge) => edge.source === nextNode!.id);
            if (edge) action = edge.label;
            else action = "";
            workflow.nodes.push(
                new Node(nextNode!.data.label as NodeType, action, new Point(nextNode!.position.x, nextNode!.position.y))
            );
        }
        return workflow;
    }

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
    async executeWorkflow(@Body() executeReq: ExecuteWorkflowDTO): Promise<string> {
        this.workflowDTOValidator.validate(executeReq.workflow);
        await this.validate(executeReq.googleToken.token);
        const workflow = this.toDomain(executeReq.workflow);
        const cmd = new ExecuteWorkflowCommand(workflow, executeReq.googleToken);
        try {
            return await this.executeWorkflowUseCase.executeWorkflow(cmd);
        } catch {
            throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export default ExecuteWorkflowController;

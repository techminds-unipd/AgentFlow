import { Workflow } from "src/workflow/domain/Workflow";
import { ExecuteWorkflowPort } from "src/workflow/service/port/output/ExecuteWorkflowPort";
import AgentRepository from "./AgentRepository";
import { Injectable } from "@nestjs/common";
import Token from "src/accountConnection/domain/Token";
import { ExecuteData, ExecuteNode, TokenFile } from "./ExecuteData";
import { ConfigService } from '@nestjs/config';

@Injectable()
class WorkflowAgentAdapter implements ExecuteWorkflowPort {
    constructor(
      private readonly agentRepository: AgentRepository,
      private readonly configService: ConfigService
    ) {}

    async executeWorkflow(workflow: Workflow, googleToken: Token): Promise<string> {
      const nodes = workflow.nodes.map(node => new ExecuteNode(node.action, node.type))
      const clientID = this.configService.get("CLIENT_ID");
      const clientSecret = this.configService.get("CLIENT_SECRET")
      const tokenFile = new TokenFile(
        googleToken.token, 
        googleToken.refreshToken,
        "https://oauth2.googleapis.com/token",
        clientID,
        clientSecret,
        ["https://www.googleapis.com/auth/gmail.readonly"],
        "googleapis.com",
        ""
      )
      
      return await this.agentRepository.executeRequest(new ExecuteData(nodes, tokenFile));
    }
}

export default WorkflowAgentAdapter;
from langchain_core.language_models import BaseLanguageModel
from langchain_core.tools import BaseTool
from langgraph.prebuilt import create_react_agent
import datetime, time
from model.WorkflowDTO import *
from langchain_core.messages import AIMessage

AgentResponse = str # type alias

class WorkflowService:
    def __init__(self, llm: BaseLanguageModel, tools: dict[BaseTool]):
        self.llm = llm
        self.tools = tools
    
    def __run_agent(self, query: str, selectedTools: list[BaseTool]) -> AgentResponse:
        agent_executor = create_react_agent(self.llm, selectedTools)
        response = agent_executor.invoke({"messages": [("user", query)]})
        return response
    
    def run(self, workflowData: list[ExecuteNode]) -> AgentResponse:
        response = []
        for (fromNode, toNode) in zip(workflowData, workflowData[1:]):
            selectedTools = self.tools[fromNode.type] + self.tools[toNode.type]

            agent_query = f"DESCRIBE EVERY tool you call and show me with which arguments\nUSING the tools from {fromNode.type}\nDO THIS action: \"{fromNode.action}\"\nAT THE END use the tools of {toNode.type}.\nThe current time is: {datetime.datetime.now()} and timezone: {time.tzname}"
            results = self.__run_agent(agent_query, selectedTools)

            ai_messages = list(filter(lambda msg: isinstance(msg, AIMessage) and msg.content, results["messages"]))
            last_ai_message = ai_messages[-1]

            response.append("ACTION: " + fromNode.action + "\nAI: " + last_ai_message.content)

        return "\n".join(response)
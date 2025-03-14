from flask import Flask, app, request
from langchain_core.language_models import BaseLanguageModel
from langchain_core.tools import BaseTool
import os.path
import json
from langchain_google_community import GmailToolkit
from langchain_google_community.gmail.utils import(
    build_resource_service,
    get_gmail_credentials,
)
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langgraph.prebuilt import create_react_agent
import pprint
import io
import tempfile
from model.tools.Pastebin import PastebinCreateBinTool
from model.tools.GCalendarCreateEvent import GCalendarCreateEventTool
from model.tools.GCalendarSearchEvent import GCalendarSearchEventTool
import datetime, time
from langchain_core.messages import AIMessage

AgentResponse = str # type alias

class WorkflowService:
    def __init__(self, llm: BaseLanguageModel, tools: dict[BaseTool]):
        self.llm = llm
        self.tools = tools
    
    def run_agent(self, query, selectedTools) -> AgentResponse:
        agent_executor = create_react_agent(self.llm, selectedTools)
        response = agent_executor.invoke({"messages": [("user", query)]})
        return response
    
    def run(self, workflowData) -> AgentResponse:
        response = []
        for (fromNode, toNode) in zip(workflowData, workflowData[1:]):
            selectedTools = self.tools[fromNode.type] + self.tools[toNode.type]

            agent_query = f"DESCRIBE EVERY tool you call and show me with which arguments\nUSING the tools from {fromNode.type}\nDO THIS action: \"{fromNode.action}\"\nAT THE END use the tools of {toNode.type}.\nThe current time is: {datetime.datetime.now()} and timezone: {time.tzname}"
            results = self.run_agent(agent_query, selectedTools)

            ai_messages = list(filter(lambda msg: isinstance(msg, AIMessage) and msg.content, results["messages"]))
            last_ai_message = ai_messages[-1]

            response.append("ACTION: " + fromNode.action + "\nAI: " + last_ai_message.content)

        return "\n".join(response)




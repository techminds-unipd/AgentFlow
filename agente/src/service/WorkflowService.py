from langchain_core.language_models import BaseLanguageModel
from langchain_core.tools import BaseTool
from langgraph.prebuilt import create_react_agent
import datetime, time
from model.WorkflowDTO import *
from langchain_core.messages import AIMessage
import tempfile, json
from langchain_google_community import GmailToolkit
from langchain_google_community.gmail.utils import(
    build_resource_service,
    get_gmail_credentials,
)
from model.tools.Pastebin import PastebinCreateBinTool
from model.tools.GCalendarCreateEvent import GCalendarCreateEventTool
from model.tools.GCalendarSearchEvent import GCalendarSearchEventTool

AgentResponse = str # type alias

class WorkflowService:
    def __init__(self, llm: BaseLanguageModel):
        self.llm = llm
    
    def __run_agent(self, query: str, selectedTools: list[BaseTool]) -> AgentResponse:
        agent_executor = create_react_agent(self.llm, selectedTools)
        response = agent_executor.invoke({"messages": [("user", query)]})
        return response
    
    def __create_token_file(self, google_token: dict):
        if google_token:
            token_temp_file=tempfile.NamedTemporaryFile(mode='w', delete=False)
            token_temp_file.write(json.dumps(google_token))
            token_temp_file.flush()
            return token_temp_file.name
        return False
    
    def run(self, workflowData: WorkflowDTO) -> AgentResponse:
        token_file_path = self.__create_token_file(workflowData.googleTokenFile.__dict__)
        credentials = get_gmail_credentials(
            token_file=token_file_path,
            client_secrets_file="credentials.json",
            scopes=["https://mail.google.com/", "https://www.googleapis.com/auth/calendar"]
        )
        api_resource = build_resource_service(credentials=credentials)
        gmailToolkit = GmailToolkit(api_resource=api_resource)
        
        tools = {}
        tools["GMAIL"] = list(filter(lambda x: x.name!='send_gmail_message', gmailToolkit.get_tools()))
        tools["GCALENDAR"] = [GCalendarCreateEventTool(token_file_path), GCalendarSearchEventTool(token_file_path)]
        tools["PASTEBIN"] = [PastebinCreateBinTool()]

        response = []
        for (fromNode, toNode) in zip(workflowData.workflowNodes, workflowData.workflowNodes[1:]):
            selectedTools = tools[fromNode.type] + tools[toNode.type]

            agent_query = f"DESCRIBE EVERY tool you call and show me with which arguments\nUSING the tools from {fromNode.type}\nDO THIS action: \"{fromNode.action}\"\nAT THE END use the tools of {toNode.type}.\nThe current time is: {datetime.datetime.now()} and timezone: {time.tzname}"
            results = self.__run_agent(agent_query, selectedTools)

            ai_messages = list(filter(lambda msg: isinstance(msg, AIMessage) and msg.content, results["messages"]))
            last_ai_message = ai_messages[-1]

            response.append("ACTION: " + fromNode.action + "\nAI: " + last_ai_message.content)

        return "\n".join(response)
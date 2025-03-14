from flask import Blueprint, request, jsonify
from service.WorkflowService import WorkflowService
from model.WorkflowDTO import *
import json
from langchain_core.language_models import BaseLanguageModel
from langchain_core.tools import BaseTool
import os.path
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

class WorkflowController:
    def __init__(self):
        self.blueprint = Blueprint('workflowController', __name__)
        self.setup_routes()

    def setup_routes(self):
        self.blueprint.add_url_rule('/execute', view_func=self.executeWorkflow, methods=['POST'])

    def create_token_file(self, google_token):
        if google_token:
            token_temp_file=tempfile.NamedTemporaryFile(mode='w', delete=False)
            token_temp_file.write(json.dumps(google_token))
            token_temp_file.flush()
            return token_temp_file.name
        return False

    def executeWorkflow(self):
        data = request.json
        workflowDTO = WorkflowDTO(
            workflowNodes=[ExecuteNode(action=workflowNode['action'], 
                type=workflowNode['type']) for workflowNode in data['workflowNodes']],
            googleTokenFile=GoogleTokenFile(
                token=data['googleTokenFile']['token'],
                refresh_token=data['googleTokenFile']['refresh_token'],
                tokenUri=data['googleTokenFile']['tokenUri'],
                client_id=data['googleTokenFile']['client_id'],
                client_secret=data['googleTokenFile']['client_secret'],
                scopes=data['googleTokenFile']['scopes'],
                universeDomain=data['googleTokenFile']['universeDomain'],
                account=data['googleTokenFile']['account']
            )
        )
        llm = ChatGroq(model="gemma2-9b-it", temperature=0)
        token_file_path = self.create_token_file(workflowDTO.googleTokenFile.__dict__)
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

        workflowService = WorkflowService(llm, tools)
        response = workflowService.run(workflowDTO.workflowNodes)
        return response
from flask import Blueprint, request
from service.WorkflowService import WorkflowService
from model.WorkflowDTO import *
import json
from jsonschema import validate
from langchain_google_community import GmailToolkit
from langchain_google_community.gmail.utils import(
    build_resource_service,
    get_gmail_credentials,
)
from langchain_groq import ChatGroq
import tempfile
from model.tools.Pastebin import PastebinCreateBinTool
from model.tools.GCalendarCreateEvent import GCalendarCreateEventTool
from model.tools.GCalendarSearchEvent import GCalendarSearchEventTool
from werkzeug.exceptions import BadRequest

class WorkflowController:
    def __init__(self):
        self.blueprint = Blueprint('workflowController', __name__)
        self.setup_routes()

    def __check_request(self, request: dict):
        schema = {
            "type": "object",
            "required": ["workflowNodes", "googleTokenFile"],
            "properties": {
                "workflowNodes": {
                    "type": "array",
                    "minItems": 2,
                    "items": {
                        "type": "object",
                        "required": ["action", "type"],
                        "properties": {
                            "action": {"type": "string"},
                            "type": {"type": "string", "enum": ["GMAIL", "GCALENDAR", "PASTEBIN"]}
                        }
                    }
                },
                "googleTokenFile": {
                    "type": "object",
                    "required": ["token", "refreshToken", "tokenUri", "clientID", 
                        "clientSecret", "scopes", "universeDomain", "account"],
                    "properties": {
                    "token": {"type": "string"},
                    "refreshToken": {"type": "string"},
                    "tokenUri": {"type": "string"},
                    "clientID": {"type": "string"},
                    "clientSecret": {"type": "string"},
                    "scopes": {"type": "array", "items": {"type": "string"}},
                    "universeDomain": {"type": "string"},
                    "account": {"type": "string"}
                    }
                }
            }
        }
        request_json = json.loads(json.dumps(request))
        try:
            validate(instance=request_json, schema=schema)
        except Exception as e:
            raise BadRequest("Invalid request format.")

    def __check_workflow(self, workflow: list[ExecuteNode]):
        for i, node in enumerate(workflow):
            if i == len(workflow) - 1 and node.action != "":
                raise BadRequest("The last node must not have an action")
            if i != len(workflow) - 1 and node.action == "":
                raise BadRequest("All nodes, except the last one, must have an action")

    def setup_routes(self):
        self.blueprint.add_url_rule('/execute', view_func=self.executeWorkflow, methods=['POST'])

    def __create_token_file(self, google_token: dict):
        if google_token:
            token_temp_file=tempfile.NamedTemporaryFile(mode='w', delete=False)
            token_temp_file.write(json.dumps(google_token))
            token_temp_file.flush()
            return token_temp_file.name
        return False

    def executeWorkflow(self):
        data = request.json
        self.__check_request(data)
        workflowDTO = WorkflowDTO(
            workflowNodes=[ExecuteNode(action=workflowNode['action'], 
                type=workflowNode['type']) for workflowNode in data['workflowNodes']],
            googleTokenFile=GoogleTokenFile(
                token=data['googleTokenFile']['token'],
                refresh_token=data['googleTokenFile']['refreshToken'],
                tokenUri=data['googleTokenFile']['tokenUri'],
                client_id=data['googleTokenFile']['clientID'],
                client_secret=data['googleTokenFile']['clientSecret'],
                scopes=data['googleTokenFile']['scopes'],
                universeDomain=data['googleTokenFile']['universeDomain'],
                account=data['googleTokenFile']['account']
            )
        )
        self.__check_workflow(workflowDTO.workflowNodes)
        llm = ChatGroq(model="gemma2-9b-it", temperature=0)
        token_file_path = self.__create_token_file(workflowDTO.googleTokenFile.__dict__)
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
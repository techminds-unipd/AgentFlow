import unittest
from unittest.mock import MagicMock, patch, mock_open
from langchain_core.messages import AIMessage
from src.service.WorkflowService import WorkflowService
from src.model.WorkflowDTO import WorkflowDTO, ExecuteNode, GoogleTokenFile
from langchain_groq import ChatGroq
from langchain_community.llms import FakeListLLM
from langchain_core.language_models import BaseLanguageModel

class TestWorkflowService(unittest.TestCase):
    def setUp(self):
        self.llm = MagicMock(spec=BaseLanguageModel)
        self.workflow_service = WorkflowService(self.llm)
        self.google_token = GoogleTokenFile(
            token="test_token",
            refresh_token="refresh_token",
            tokenUri="https://example.com/token",
            client_id="client_id",
            client_secret="client_secret",
            scopes=["scope1", "scope2"],
            universeDomain="example.com",
            account="user@example.com"
        )

        self.workflow_nodes = [
            ExecuteNode(action="search for emails", type="GMAIL"),
            ExecuteNode(action="create event", type="GCALENDAR")
        ]
        
        self.workflow_dto = WorkflowDTO(
            workflowNodes=self.workflow_nodes,
            googleTokenFile=self.google_token
        )
    
    @patch('src.service.WorkflowService.get_gmail_credentials')
    @patch('src.service.WorkflowService.build_resource_service')
    @patch('src.service.WorkflowService.GmailToolkit')
    @patch('src.service.WorkflowService.GCalendarCreateEventTool')
    @patch('src.service.WorkflowService.GCalendarSearchEventTool')
    @patch('src.service.WorkflowService.PastebinCreateBinTool')
    @patch('src.service.WorkflowService.WorkflowService._WorkflowService__run_agent')
    @patch('src.service.WorkflowService.WorkflowService._WorkflowService__create_token_file')
    def test_run_workflow_TUA5(self, mock_create_token, mock_run_agent, 
                         mock_pastebin, mock_gcalendar_search, mock_gcalendar_create,
                         mock_gmail_toolkit, mock_build_resource, 
                         mock_get_credentials):
        mock_credentials = MagicMock()
        mock_get_credentials.return_value = mock_credentials
        
        mock_api_resource = MagicMock()
        mock_build_resource.return_value = mock_api_resource
        
        mock_toolkit = MagicMock()
        mock_gmail_toolkit.return_value = mock_toolkit
        mock_toolkit.get_tools.return_value = [MagicMock(name="tool1"), MagicMock(name="tool2")]

        mock_calendar_create_tool = MagicMock()
        mock_gcalendar_create.return_value = mock_calendar_create_tool
        
        mock_calendar_search_tool = MagicMock()
        mock_gcalendar_search.return_value = mock_calendar_search_tool
        
        mock_pastebin_tool = MagicMock()
        mock_pastebin.return_value = mock_pastebin_tool

        mock_create_token.return_value = '/tmp/test_token_file'
        mock_run_agent.return_value = {
            "messages": [AIMessage(content="Test AI response")]
        }
        
        result = self.workflow_service.run(self.workflow_dto)


        mock_create_token.assert_called_once_with(self.google_token.__dict__)
        mock_run_agent.assert_called_once()
        self.assertIn("ACTION: search for emails", result)
        self.assertIn("AI: Test AI response", result)
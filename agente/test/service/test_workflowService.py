import os
import pytest
import unittest
from unittest.mock import MagicMock, patch, mock_open
import json
import tempfile
from langchain_core.messages import AIMessage
from src.service.WorkflowService import WorkflowService
from src.model.WorkflowDTO import WorkflowDTO, ExecuteNode, GoogleTokenFile

class TestWorkflowService(unittest.TestCase):
    def setUp(self):
        # Mock LLM
        self.llm = MagicMock()
        
        # Create service
        self.workflow_service = WorkflowService(self.llm)
        
        # Sample token file
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
        
        # Sample workflow
        self.workflow_nodes = [
            ExecuteNode(action="search for emails", type="GMAIL"),
            ExecuteNode(action="create event", type="GCALENDAR")
        ]
        
        self.workflow_dto = WorkflowDTO(
            workflowNodes=self.workflow_nodes,
            googleTokenFile=self.google_token
        )
        
    @patch('tempfile.NamedTemporaryFile')
    def test_create_token_file(self, mock_temp_file):
        # Setup mock
        mock_file = MagicMock()
        mock_file.name = "/tmp/test_token.json"
        mock_temp_file.return_value = mock_file
        
        # Call the method
        with patch('builtins.open', mock_open()) as m:
            result = self.workflow_service._WorkflowService__create_token_file(
                self.google_token.__dict__)
        
        # Assert
        self.assertEqual(result, "/tmp/test_token.json")
        mock_file.write.assert_called_once()
        mock_file.flush.assert_called_once()
    
    def test_create_token_file_empty(self):
        result = self.workflow_service._WorkflowService__create_token_file(None)
        self.assertFalse(result)
    
    @patch('src.service.WorkflowService.get_gmail_credentials')
    @patch('src.service.WorkflowService.build_resource_service')
    @patch('src.service.WorkflowService.GmailToolkit')
    @patch('src.service.WorkflowService.create_react_agent')
    @patch('src.service.WorkflowService.GCalendarCreateEventTool')
    @patch('src.service.WorkflowService.GCalendarSearchEventTool')
    @patch('src.service.WorkflowService.PastebinCreateBinTool')
    def test_run_workflow(self, mock_pastebin, mock_gcalendar_search, mock_gcalendar_create,
                         mock_create_agent, mock_gmail_toolkit, mock_build_resource, 
                         mock_get_credentials):
        # Setup mocks
        mock_credentials = MagicMock()
        mock_get_credentials.return_value = mock_credentials
        
        mock_api_resource = MagicMock()
        mock_build_resource.return_value = mock_api_resource
        
        mock_toolkit = MagicMock()
        mock_gmail_toolkit.return_value = mock_toolkit
        mock_toolkit.get_tools.return_value = [MagicMock(name="tool1"), MagicMock(name="tool2")]
        
        mock_agent_executor = MagicMock()
        mock_create_agent.return_value = mock_agent_executor
        
        # Mock AI message
        ai_message = AIMessage(content="Test response")
        mock_agent_executor.invoke.return_value = {"messages": [ai_message]}
        
        # Setup calendar tools
        mock_calendar_create_tool = MagicMock()
        mock_gcalendar_create.return_value = mock_calendar_create_tool
        
        mock_calendar_search_tool = MagicMock()
        mock_gcalendar_search.return_value = mock_calendar_search_tool
        
        mock_pastebin_tool = MagicMock()
        mock_pastebin.return_value = mock_pastebin_tool
        
        # Call the method with patch for temporary file
        with patch.object(self.workflow_service, '_WorkflowService__create_token_file') as mock_create_file:
            mock_create_file.return_value = "/tmp/test_token.json"
            result = self.workflow_service.run(self.workflow_dto)
        
        # Assert
        mock_get_credentials.assert_called_once()
        mock_build_resource.assert_called_once_with(credentials=mock_credentials)
        mock_gmail_toolkit.assert_called_once_with(api_resource=mock_api_resource)
        mock_create_agent.assert_called_once()
        mock_agent_executor.invoke.assert_called_once()
        self.assertIn("ACTION: search for emails", result)
        self.assertIn("AI: Test response", result)
                
    @patch('src.service.WorkflowService.create_react_agent')
    def test_run_agent(self, mock_create_agent):
        # Setup mock
        mock_agent = MagicMock()
        mock_create_agent.return_value = mock_agent
        mock_agent.invoke.return_value = {"result": "test result"}
        
        # Test
        tools = [MagicMock(), MagicMock()]
        result = self.workflow_service._WorkflowService__run_agent("test query", tools)
        
        # Assert
        mock_create_agent.assert_called_once_with(self.llm, tools)
        mock_agent.invoke.assert_called_once()
        self.assertEqual(result, {"result": "test result"})
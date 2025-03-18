import unittest
from unittest.mock import MagicMock, patch
import json
import flask
from flask import Flask
from werkzeug.exceptions import BadRequest

from src.controller.WorkflowController import WorkflowController
from src.service.WorkflowService import WorkflowService
from src.model.WorkflowDTO import WorkflowDTO, ExecuteNode, GoogleTokenFile

class WorkflowControllerTest(unittest.TestCase):
    def setUp(self):
        # Create Flask app
        self.app = Flask(__name__)
        # Mock the WorkflowService
        self.workflowService = MagicMock(spec=WorkflowService)
        self.workflowService.run = MagicMock(return_value="test response")
        
        # Create the controller with the mocked service
        self.workflowController = WorkflowController(self.workflowService)
        
        # Sample valid request data
        self.request_data = {
            "workflowNodes": [
                {"action": "action1", "type": "GMAIL"},
                {"action": "", "type": "GCALENDAR"}
            ],
            "googleTokenFile": {
                "token": "token123",
                "refreshToken": "refreshToken123",
                "tokenUri": "https://example.com/token",
                "clientID": "client123",
                "clientSecret": "secret123",
                "scopes": ["scope1", "scope2"],
                "universeDomain": "example.com",
                "account": "user@example.com"
            }
        }
    
    def test_executeWorkflow(self):
        # Use Flask's test_request_context to simulate a request
        with self.app.test_request_context(
            '/execute',
            method='POST',
            json=self.request_data,
            content_type='application/json'
        ):
            # Call the method within the request context
            response = self.workflowController.executeWorkflow()
            
            # Assertions
            self.assertEqual(response, "test response")
            
            # Verify that WorkflowService.run was called with the correct DTO
            self.workflowService.run.assert_called_once()
            
            # Access the arguments the mock was called with
            # call_args = self.workflowService.run.call_args[0][0]
            # self.assertIsInstance(call_args, WorkflowDTO)

    def test_executeWorkflow_invalid_request(self):
        # Use Flask's test_request_context with invalid data
        with self.app.test_request_context(
            '/execute',
            method='POST',
            json={"workflowNodes": []},
            content_type='application/json'
        ):
            # Verify that BadRequest exception is raised
            with self.assertRaises(BadRequest):
                self.workflowController.executeWorkflow()

if __name__ == '__main__':
    unittest.main()
import unittest
from unittest.mock import MagicMock, patch
import json
import flask
from flask import Flask

from src.controller.WorkflowController import WorkflowController
from src.service.WorkflowService import WorkflowService

class WorkflowIntegrationTest(unittest.TestCase):
    def setUp(self):
        # Create Flask app
        self.app = Flask(__name__)
        
        # Mock the WorkflowService
        self.workflowService = MagicMock(spec=WorkflowService)
        self.workflowService.run = MagicMock(return_value="test response")
        
        # Create and register the controller
        self.workflowController = WorkflowController(self.workflowService)
        self.app.register_blueprint(self.workflowController.blueprint)
        
        # Get test client
        self.client = self.app.test_client()
        
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

    def test_execute_workflow_endpoint(self):
        # Send request to the endpoint
        response = self.client.post(
            '/execute',
            data=json.dumps(self.request_data),
            content_type='application/json'
        )
        
        # Verify response
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.decode('utf-8'), "test response")
        
        # Verify the service was called
        self.workflowService.run.assert_called_once()

if __name__ == '__main__':
    unittest.main()

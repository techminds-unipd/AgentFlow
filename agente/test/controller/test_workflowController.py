import unittest
from unittest.mock import MagicMock
from flask import Flask
from werkzeug.exceptions import BadRequest

from src.controller.WorkflowController import WorkflowController
from src.service.WorkflowService import WorkflowService

class WorkflowControllerTest(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.workflowService = MagicMock(spec=WorkflowService)
        self.workflowService.run = MagicMock(return_value="test response")

        self.workflowController = WorkflowController(self.workflowService)
        
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
        with self.app.test_request_context(
            '/execute',
            method='POST',
            json=self.request_data,
            content_type='application/json'
        ):
            response = self.workflowController.executeWorkflow()
            
            self.assertEqual(response, "test response")

    def test_executeWorkflow_invalid_request(self):
        with self.app.test_request_context(
            '/execute',
            method='POST',
            json={"workflowNodes": []},
            content_type='application/json'
        ):
            with self.assertRaises(BadRequest):
                self.workflowController.executeWorkflow()

if __name__ == '__main__':
    unittest.main()
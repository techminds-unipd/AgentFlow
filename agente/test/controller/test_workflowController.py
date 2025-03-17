import unittest

from src.controller.WorkflowController import WorkflowController
from src.service.WorkflowService import WorkflowService
from src.model.WorkflowDTO import *
from unittest.mock import MagicMock
import json
from flask import Request

class WorkflowControllerTest(unittest.TestCase):
    def setUp(self):
        self.workflowService = MagicMock(spec=WorkflowService)
        self.workflowService.run = MagicMock(return_value="response")
        self.workflowController = WorkflowController(self.workflowService)

    def test_run_workflow(self):
        # workflowData = WorkflowDTO(
        #     workflowNodes=[
        #         ExecuteNode(action="action1", type="GMAIL"),
        #         ExecuteNode(action="action2", type="GCALENDAR")
        #     ],
        #     googleTokenFile=GoogleTokenFile(
        #         token="token",
        #         refresh_token="refreshToken",
        #         tokenUri="tokenUri",
        #         client_id="clientID",
        #         client_secret="clientSecret",
        #         scopes=["scope"],
        #         universeDomain="universeDomain",
        #         account="account"
        #     )
        # )


        
        
        response = self.workflowController.executeWorkflow()
        self.assertEqual(response, "response")
        #self.workflowService.run.assert_called_once_with(workflowData)



if __name__ == '__main__':
    unittest.main()
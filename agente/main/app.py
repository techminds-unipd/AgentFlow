from flask import Flask
from controller.WorkflowController import WorkflowController
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Create an instance of UserController
workflowController = WorkflowController()

# Register the user controller's blueprint
app.register_blueprint(workflowController.blueprint)

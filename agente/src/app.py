from flask import Flask
from controller.WorkflowController import WorkflowController
from service.WorkflowService import WorkflowService
from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv()

app = Flask(__name__)

llm = ChatGroq(model="gemma2-9b-it", temperature=0)

workflowService = WorkflowService(llm)

# Create an instance of UserController
workflowController = WorkflowController(workflowService)

# Register the user controller's blueprint
app.register_blueprint(workflowController.blueprint)

class GoogleTokenFile:
    def __init__(self, token: str, refresh_token: str, 
                 tokenUri: str, client_id: str, client_secret: str, 
                 scopes: list[str], universeDomain: str, account: str):
        self.token = token
        self.refresh_token = refresh_token
        self.tokenUri = tokenUri
        self.client_id = client_id
        self.client_secret = client_secret
        self.scopes = scopes
        self.universeDomain = universeDomain
        self.account = account

class ExecuteNode:
    def __init__(self, action: str, type: str):
        self.action = action
        self.type = type

class WorkflowDTO:
    def __init__(self, workflowNodes: list[ExecuteNode], googleTokenFile: GoogleTokenFile):
        self.workflowNodes = workflowNodes
        self.googleTokenFile = googleTokenFile
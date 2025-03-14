from langchain_core.tools import BaseTool
from langchain_core.callbacks import CallbackManagerForToolRun
from typing import Type, Optional
from pydantic import BaseModel, Field
import requests, os

class BinSchema(BaseModel):
    message: str = Field(description="The bin message.")

class PastebinCreateBinTool(BaseTool):
    name: str = "create_pastebin_text"
    description: str = ("Use this tool to create a new pastebin text.")
    args_schema: Type[BinSchema] = BinSchema
    token: str = os.getenv("PASTEBIN_TOKEN")

    def create_bin(self, message):
        data = {
            "api_dev_key": self.token,
            "api_option": "paste",
            "api_paste_private": "1",
            "api_paste_expire_date": "10M",
            "api_paste_code": message,
        }
        response = requests.post("https://pastebin.com/api/api_post.php", data=data)
        return response.text

    def _run(
            self,
            message: str,
            run_manager: Optional[CallbackManagerForToolRun] = None,
    ) -> str:
        result = self.create_bin(message)
        output = "Bin created: " + result
        return output

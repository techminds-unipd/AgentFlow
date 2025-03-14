from langchain_core.tools import BaseTool
from langchain_core.callbacks import CallbackManagerForToolRun
from typing import Type, Optional
from pydantic import BaseModel, Field
import os.path
import datetime
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = ["https://www.googleapis.com/auth/calendar"]

class GCalendarCreateEventSchema(BaseModel):
    summary: str = Field(description="Summary of the event")
    location: str = Field(description="Phisical location of the event")
    description: str = Field(description="Event description")
    startDateTime: str = Field(description="Start date and time in ISO format like 2015-05-28T09:00:00-07:00")
    endDateTime: str = Field(description="End date and time in ISO format like 2015-05-28T09:00:00-07:00")

class GCalendarCreateEventTool(BaseTool):
    name: str = "google_calendar_create"
    description: str = "A tool for creating Google Calendar events and meetings."
    args_schema: Type[GCalendarCreateEventSchema] = GCalendarCreateEventSchema
    creds: Credentials = None

    def __init__(self, token_file_path):
        super().__init__()
        if os.path.exists(token_file_path):
            self.creds = Credentials.from_authorized_user_file(token_file_path, SCOPES)
        if not self.creds or not self.creds.valid:
            exit(1)

    def create_event(self, summary, location, description, startDateTime, endDateTime):
        event = {
            'summary': summary,
            'location': location,
            'description': description,
            'start': {
                'dateTime': startDateTime,
                'timeZone': 'Europe/Rome',
            },
            'end': {
                'dateTime': endDateTime,
                'timeZone': 'Europe/Rome',
            },
            'reminders': {
                'useDefault': True,
            },
        }

        try:
            service = build("calendar", "v3", credentials=self.creds)
            event = service.events().insert(calendarId='primary', body=event).execute()
            return event.get('htmlLink')

        except HttpError as error:
            print(f"An error occurred: {error}")

    def _run(
            self,
            summary: str,
            location: str,
            description: str,
            startDateTime: str,
            endDateTime: str,
            run_manager: Optional[CallbackManagerForToolRun] = None,
    ) -> str:
        result = self.create_event(summary, location, description, startDateTime, endDateTime)
        output = 'Event created: %s' % result
        return output

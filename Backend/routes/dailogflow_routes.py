from fastapi import APIRouter, HTTPException 
import os 
from models.dialog_models import Message
from google.cloud import dialogflow_v2 as dialogflow



# Set Google Cloud credentials (update with your JSON file path)
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\yash kamal shetty\Downloads\chatty-oukn-1e224588c278.json"

# Dialogflow settings
PROJECT_ID = "chatty-oukn"  # Replace with your Dialogflow Project ID


router = APIRouter()


@router.post("/dialogflow")
async def detect_intent(message: Message):
    try:
        # Create a Dialogflow session client
        session_client = dialogflow.SessionsClient()
        session = session_client.session_path(PROJECT_ID, message.session_id)

        # Create a text input
        text_input = dialogflow.TextInput(text=message.text, language_code="en")
        query_input = dialogflow.QueryInput(text=text_input)

        # Detect intent
        response = session_client.detect_intent(
            request={"session": session, "query_input": query_input}
        )

        return {
            "response": response.query_result.fulfillment_text,
            "intent": response.query_result.intent.display_name,
            "confidence": response.query_result.intent_detection_confidence,
        }
    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))
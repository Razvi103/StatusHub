from openai import OpenAI
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

def bug_prompter(user_name, app_name, endpoint_url, bug_description, ch_limit=None):
    api_key = os.getenv("OPENAI_API_KEY")
    client = OpenAI(api_key=api_key)

    prompt = (
        f"I have an app which acts similar to a bug/issue tracker. "
        f"You have users which may be developers and they work at different apps. "
        f"Each app has different endpoints from their API. The app tracks the status "
        f"of each endpoint (stable, unstable, down etc.). "
        f"Users/developers can also report bugs specific to an endpoint from the app. "
        f"When a bug is reported, the developers that work at the app where the reported endpoint comes from are notified about that. "
        f"Your job is to generate a good notification text for that. Do not write a subject for the email. I will give you some parameters which you must include in the description (their value is provided by me and you should include that, they are not placeholders): "
        f"- the name of the developer which is notified is {user_name} "
        f"- the name of the app containing the buggy endpoint is {app_name} "
        f"- the buggy endpoint URL is {endpoint_url}. "
        f"- the description provided by the reporter of the bug is {bug_description}. "
        f"Write a friendly message to the user and describe everything clearly. "
        f"Try to give suggestions for solving the bug or for other relevant stuff."
        f"Do not try to add placeholders or sign the email like you are a person/team that sends it, just deliver the information and just finish it simple with a have a good day statement or something similar, nothing like 'best regards,...'."
    )

    if ch_limit is not None:
        prompt += f" Limit the text to at most {ch_limit} characters."

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {
                "role": "system", 
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content

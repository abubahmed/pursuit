from huggingface_hub import InferenceClient
from loguru import logger
import json
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from secrets import HUGGINGFACE_API_KEY


class InferenceClientClass:
    def __init__(self):
        self.API_KEY = HUGGINGFACE_API_KEY
        self.MODEL = "01-ai/Yi-1.5-34B-Chat"
        self.MAX_TOKENS = 1024
        self.TEMPERATURE = 0.5
        self.TOP_P = 0.7
        try:
            self.client = InferenceClient(api_key=self.API_KEY)
        except:
            logger.exception("Failed to initialize InferenceClient")
            self.client = None

    def get_prompt(self, text):
        prompt = f"""
            Please extract the variables of interest from the text below and return them in JSON format. If a variable is not present, please return an empty string for that variable.

            Input text:
            ---
            {text}
            ---

            Expected output:
            {{
              "name": "<name>",
              "location": "<location>"
            }}
            """
        return prompt

    def extract_variables(self, text):
        if self.client is None:
            return None
        if not text:
            logger.exception("No text provided")
            return None
        prompt = self.get_prompt(text)
        messages = [{"role": "user", "content": prompt}]
        stream = self.client.chat.completions.create(
            model=self.MODEL,
            messages=messages,
            temperature=self.TEMPERATURE,
            max_tokens=self.MAX_TOKENS,
            top_p=self.TOP_P,
            stream=False,
        )
        response = stream.choices[0].message.content
        start = response.find("{")
        end = response.rfind("}") + 1
        json_data = response[start:end]
        structured_data = json.loads(json_data)
        return structured_data


def test_inference_client():
    client = InferenceClientClass()
    text = "John Doe is a software engineer in New York City."
    variables = client.extract_variables(text)
    logger.info(variables["name"])
    logger.info(variables["location"])


if __name__ == "__main__":
    test_inference_client()

from huggingface_hub import InferenceClient
from loguru import logger
import json
import sys
import os

# sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from .secrets import HUGGINGFACE_API_KEY


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
            Please extract the specified variables of interest from the input text below and return them in strictly JSON format. 

            Instructions:
            - For each variable, extract the most relevant and explicit information from the input text. 
            - If a variable is not mentioned or cannot be clearly identified, return an empty string ("") for that variable.
            - Ensure the JSON output strictly adheres to the specified format without any additional fields or text.

            Variables to extract:
            - title: The job title or position name.
            - company: The name of the company or organization.
            - description: A brief description of the job or position. Summarize the key responsibilities or requirements in one brief sentence.
            - location: The location of the job or position.
            - salary: The salary or compensation offered for the job or position (hourly, yearly, etc.).
            - status: The current hiring status of the job. Choose one of the following options based on the content: "Open", "Closed", "Opening soon", or "Other".
            - skills: The required or preferred skills for the job. List the skills as an array of strings (e.g., ["Python", "Java", "SQL"]).
            - during: The time period of the job or position. Choose one of the following options based on the content: "Winter", "Spring", "Summer", "Fall", "Year-round", or "Other".
            - type: The type of job or position. Choose one of the following options based on the content: "Full-time", "Part-time", "Contract", "Internship", "Freelance", "Fellowship", or "Other".
            - level: The experience level required for the job. Choose one of the following options based on the content: "Entry", "Mid", "Senior", "Lead", "Manager", "Director", or "Other".
            - mode: The work mode or arrangement for the job. Choose one of the following options based on the content: "Remote", "Onsite", "Hybrid", or "Other".
            
            Note that the provided input is the result of a web scraping process and may contain some noise or irrelevant information. Focus on extracting the most relevant and explicit details for each variable.
            
            If the input text does not contain information for a specific variable, please return an empty string ("") for that variable.
            
            if the input text contains information that suggests a failure in the extraction process (404 error, verification required, etc.), please return an empty string ("") for all variables.
          
            Input text:
            ---
            {text}
            ---

            Example Output:
            {{
              "title": "Software Development Engineer Internship - 2025 (US)",
              "company": "Amazon",
              "description": "Amazon is looking for passionate software development engineers to join our team in Seattle, WA. This internship is open to students graduating in 2025.",
              "location": "Seattle, WA",
              "salary": "$10,000/month",
              "status": "Open",
              "skills": ["Java", "Python", "C++"],
              "during": "Summer",
              "type": "Internship",
              "level": "Entry",
              "mode": "Onsite",
            }}

            Expected output:
            {{
              "title": <title>,
              "company": <company>,
              "description": <description>,
              "location": <location>,
              "salary": <salary>,
              "status": <status>,
              "skills": <skills>,
              "during": <during>,
              "type": <type>,
              "level": <level>,
              "mode": <mode>
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
    text = "Software Engineer at Google in New York"
    variables = client.extract_variables(text)
    logger.info(variables["title"])
    logger.info(variables["location"])


if __name__ == "__main__":
    test_inference_client()

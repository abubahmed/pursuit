from loguru import logger
from api.util.secrets import OPENAI_API_KEY
from api.models.job_model import Job
import json
import copy
from openai import OpenAI


class OpenAIClient:
    def __init__(self):
        self.client = OpenAI(api_key=OPENAI_API_KEY)

    def get_prompt(self, text):
        prompt = f"""
            Please extract the specified variables of interest from provided input text and return them in JSON format.

            Instructions:
            - For each variable, extract the most relevant and explicit information from the input text.
            - If a variable is not mentioned or cannot be clearly identified, return a falsy value for that variable ("" or [] depending on variable type). For example, if the salary is not mentioned, return "".
            - Ensure the JSON output strictly adheres to the specified format without any syntax.

            Additional points:
            - The provided input is the result of a web scraping process and may contain some noise (such as additional job postings). Focus only on extracting relevant details.
            - While the text is expected to represent a job posting, it may also represent other types of applications and opportunities such as fellowships, internships, and scholarships. In such cases, proceed with extraction as usual.
            - If the input text does not contain information for a specific variable, please return a falsy value ("" or [] depending on variable type).
            - If the input text contains information that suggests a failure in the extraction process (404 error, verification required, etc.), please return falsy values for all variables ("" or [] depending on variable type).
            - If the input text contains information that suggests the job listing has been removed or is no longer available, please return falsy values for all variables ("" or [] depending on variable type).

            Variables to extract:
            - title: The job title or position name. Type: string. ~1-20 tokens.
            - company: The name of the company or organization. Type: string. ~1-5 tokens.
            - description: A brief description of the job or position. Summarize the key responsibilities or requirements in one brief sentence. Type: string. ~10-50 tokens.
            - location: The location of the job or position. Type: string. ~1-5 tokens.
            - salary: The salary or compensation offered for the job or position (hourly, yearly, etc.). Type: string. ~1-5 tokens.
            - skills: The required or preferred skills for the job. List the skills as an array of strings (e.g., ["Python", "Java", "SQL"]). Type: array of strings.
            - during: The time period of the job or position. Choose one of the following options: "Winter", "Spring", "Summer", "Fall", "Year-round", or "Other". Type: string.
            - type: The type of job or position. Choose one of the following options: "Full-time", "Part-time", "Contract", "Internship", "Freelance", or "Other". Type: string.
            - level: The experience level required for the job. Choose one of the following options: "Entry", "Mid", "Senior", "Lead", "Manager", "Director", or "Other". Type: string.
            - mode: The work mode or arrangement for the job. Choose one of the following options: "Remote", "Onsite", "Hybrid", or "Other". Type: string.

            Example output:
            {{
              "title": "Software Development Engineer Internship - 2025 (US)",
              "company": "Amazon",
              "description": "Amazon is looking for passionate software development engineers to join our team in Seattle, WA. This internship is open to students graduating in 2025.",
              "location": "Seattle, WA",
              "salary": "$10,000/month",
              "skills": ["Java", "Python", "C++"],
              "during": "Summer",
              "type": "Internship",
              "level": "Entry",
              "mode": "Onsite",
            }}

            Expected output format:
            {{
              "title": <title>,
              "company": <company>,
              "description": <description>,
              "location": <location>,
              "salary": <salary>,
              "skills": <skills>,
              "during": <during>,
              "type": <type>,
              "level": <level>,
              "mode": <mode>,
            }}
            
            
            Input text:
            ---
            {text}
            ---
            """
        return prompt

    def get_schema(self):
        data_schema = {
            "title": "",
            "company": "",
            "description": "",
            "location": "",
            "salary": "",
            "skills": [],
            "during": "",
            "type": "",
            "level": "",
            "mode": "",
        }
        return data_schema

    def extract_variables(self, text):
        if self.client is None or text is None:
            logger.exception("Invalid input for client")
            return None
        try:
            instructions = self.get_prompt(text)
            completion = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "user", "content": instructions},
                ],
                response_format={"type": "text"},
                temperature=1,
                max_completion_tokens=1024,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0,
            )
            response = completion.choices[0].message.content
            logger.info("OpenAI client response: " + response)
            start = response.find("{")
            end = response.rfind("}") + 1
            json_data = response[start:end]
            structured_data = json.loads(json_data)
            schema = self.get_schema()
            if not all(key in structured_data for key in schema):
                logger.exception("Failed to extract variables")
                return copy.deepcopy(schema)
            if all(not value for value in structured_data.values()):
                logger.exception("No variables extracted")
                return copy.deepcopy(schema)
            choices_map = {
                "mode": Job.JOB_MODE_CHOICES,
                "level": Job.JOB_LEVEL_CHOICES,
                "type": Job.JOB_TYPE_CHOICES,
                "during": Job.JOB_DURING_CHOICES,
            }
            for key, value in structured_data.items():
                if key in choices_map and value not in [
                    choice[0] for choice in choices_map[key]
                ]:
                    structured_data[key] = ""
            return structured_data
        except Exception as e:
            logger.exception("Failed to extract variables " + str(e))
            return copy.deepcopy(schema)


def test_inference_client():
    client = OpenAIClient()
    text = "Software Engineer at Google in New York"
    variables = client.extract_variables(text)
    logger.info(variables["title"])
    logger.info(variables["location"])


if __name__ == "__main__":
    test_inference_client()

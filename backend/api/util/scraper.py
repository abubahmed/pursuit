import requests
from bs4 import BeautifulSoup
from loguru import logger
import string
from api.util.secrets import SCRAPERAPI_API_KEY


class Scraper:      
    def get_text(self, url):
        if not url:
            logger.exception("Invalid URL")
            return None
        try:
            payload = {
                "api_key": SCRAPERAPI_API_KEY,
                "url": url,
                "retry_404": "true",
                "follow_redirect": "false",
                "country_code": "us",
                "device_type": "desktop",
                "render": "true",
            }
            r = requests.get("https://api.scraperapi.com/", params=payload)
            soup = BeautifulSoup(r.text, "html.parser")
            tags_to_remove = ["head", "script", "style", "footer", "nav", "header"]
            for tag in tags_to_remove:
                for element in soup.find_all(tag):
                    element.decompose()
            text = soup.get_text()
            trimmed_text = " ".join(text.split())
            allowed_chars = string.ascii_letters + string.digits + string.punctuation + " "
            cleaned_text = "".join(char for char in trimmed_text if char in allowed_chars)
            logger.info(cleaned_text)
            return cleaned_text
        except Exception as e:
            logger.exception(e)
            return None


def test_scraper():
    scraper = Scraper()
    soup = scraper.scrape_data(
        "https://www.github.careers/careers-home/jobs/3569?lang=en-us"
    )
    text = scraper.get_text(soup)
    logger.info(text)


if __name__ == "__main__":
    test_scraper()

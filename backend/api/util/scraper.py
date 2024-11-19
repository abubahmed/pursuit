import requests
from bs4 import BeautifulSoup
from loguru import logger
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from secrets import SCRAPERAPI_API_KEY


class Scraper:
    def __init__(self):
        self.API_URL = "https://api.scraperapi.com/"
        self.API_KEY = SCRAPERAPI_API_KEY
        self.COUNTRY_CODE = "us"
        self.DEVICE_TYPE = "desktop"
        self.KEEP_HEADERS = "true"

    def scrape(self, url):
        if not url:
            logger.exepction("No URL provided")
            return None
        try:
            payload = {
                "api_key": self.API_KEY,
                "url": url,
                "country_code": self.COUNTRY_CODE,
                "device_type": self.DEVICE_TYPE,
                "keep_headers": self.KEEP_HEADERS,
            }
            r = requests.get(self.API_URL, params=payload)
            soup = BeautifulSoup(r.text, "html.parser")
            return soup
        except Exception as e:
            logger.exception(e)
            return None

    def get_text(self, soup):
        if not soup or not isinstance(soup, BeautifulSoup):
            logger.exception("Invalid BeautifulSoup object")
            return None
        all_text = soup.get_text()
        trimmed_text = " ".join(all_text.split())
        return trimmed_text


def test_scraper():
    scraper = Scraper()
    soup = scraper.scrape(
        "https://www.ziprecruiter.com/c/Matlen-Silver/Job/Software-Engineer/-in-Pennington,NJ?jid=4f57d55fb2ef2acc&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic"
    )
    text = scraper.get_text(soup)
    logger.info(text)


if __name__ == "__main__":
    test_scraper()

import os
from typing import Dict
from dataclasses import dataclass
from starlette.applications import Starlette
from starlette.responses import HTMLResponse
from starlette.routing import Route
from starlette.requests import Request
import requests
import urllib
import uvicorn

# -----
# Utils
# -----


@dataclass
class Config:
    port: int
    website_url: str

    @classmethod
    def from_env(cls):
        try:
            port_int = int(os.environ.get("PORT", "42069"))
        except ValueError:
            port_int = 42069

        return cls(
            port=port_int,
            website_url=os.environ.get("WEBSITE_URL"),
        )


def get_website(website_url: str) -> str:
    """Helper function to fetch website HTML"""
    response = requests.get(website_url, headers={"User-Agent": "Mozilla/5.0"})
    if response.status_code != 200:
        raise Exception(
            f"Failed to fetch webpage: {response.status_code}. {response.text}")
    return response.text


def get_content(path: str) -> str:
    """Helper to fetch css"""
    url = urllib.parse.urljoin(config.website_url, path)
    allowed_content_types = ["text/css",
                             "text/css; charset=utf-8", "image/png", "image/gif", "image/jpeg"]
    response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
    if response.status_code != 200:
        raise Exception(
            f"Failed to fetch webpage: {response.status_code}. {response.text}")
    if response.headers.get("Content-Type").lower() not in allowed_content_types:
        raise Exception(
            f"Invalid content type: {response.headers.get('Content-Type')}")

    return response.content

# -----
# App
# -----


async def index(request: Request) -> HTMLResponse:
    if not request.app.state.content.get("_index_"):
        try:
            request.app.state.content["_index_"] = get_website(
                config.website_url)
        except Exception as e:
            request.app.state.content["_index_"] = str(
                f"<html><body><h1>Error</h1><p>Could not fetch website: {e}</p></body></html>"
            )
    return HTMLResponse(content=request.app.state.content.get("_index_"), status_code=200)


async def content(request: Request) -> HTMLResponse:
    path = request.url.path
    if not request.app.state.content.get(path):
        try:
            request.app.state.content[path] = get_content(path)
        except Exception as e:
            request.app.state.content[path] = str(
                f"<html><body><h1>Error</h1><p>Could not fetch content: {e}</p></body></html>"
            )
    return HTMLResponse(content=request.app.state.content.get(path), status_code=200)

routes = [
    Route("/", index, methods=["GET"]),
    Route("/{path:path}", content, methods=["GET"])
]

app = Starlette(debug=True, routes=routes)

# -----
# Run
# -----

if __name__ == "__main__":
    print("Loading configuration")
    config = Config.from_env()
    app.state.content = {}

    if not config.website_url:
        raise Exception("Missing environment variable: WEBSITE_URL")

    print(
        f"Starting server on port {config.port}.\nWebsite URL: {config.website_url}")
    uvicorn.run(app, host="0.0.0.0", port=config.port)

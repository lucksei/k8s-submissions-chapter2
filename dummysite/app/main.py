import os
from starlette.applications import Starlette
from starlette.responses import HTMLResponse
from starlette.routing import Route
from starlette.requests import Request
import requests
import uvicorn

PORT = os.environ.get("PORT", "42069")
WEBSITE_URL = os.environ.get("WEBSITE_URL")

# -----
# Utils
# -----


def get_website(website_url: str) -> str:
    """Helper function to fetch website HTML"""
    response = requests.get(website_url, headers={"User-Agent": "Mozilla/5.0"})
    if response.status_code != 200:
        raise Exception(
            f"Failed to fetch webpage: {response.status_code}. {response.text}")
    return response.text

# -----
# App
# -----


async def index(request: Request) -> HTMLResponse:
    website_html = request.app.state.website_html
    return HTMLResponse(content=website_html, status_code=200)

routes = [
    Route("/", index, methods=["GET"])
]

app = Starlette(debug=True, routes=routes)

# -----
# Run
# -----

if __name__ == "__main__":
    print("Loading website")
    try:
        app.state.website_html = get_website(WEBSITE_URL)
    except Exception as e:
        print(f"Failed to load website: {e}")
        exit(1)

    port = 42069
    try:
        port = int(PORT)
    except ValueError:
        print(f"Failed to parse port: {PORT}. Defaulting to 42069")

    print(f"Starting server on port {port}")
    uvicorn.run(app, host="0.0.0.0", port=port)

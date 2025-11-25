#!/bin/sh


# BASE_URL=http://localhost:3001

WIKIPEDIA_RANDOM_PAGE_URL=$(curl -L -I "https://en.wikipedia.org/wiki/Special:Random" | grep "location:" | awk -F' ' '{print $2}' | tr -d '\r\n')
echo "WIKIPEDIA_RANDOM_PAGE_URL: ${WIKIPEDIA_RANDOM_PAGE_URL}"
echo "{\"todo\": \"Read ${WIKIPEDIA_RANDOM_PAGE_URL} here\"}"
curl -X POST -H "Content-Type: application/json" -d "{\"todo\": \"Read ${WIKIPEDIA_RANDOM_PAGE_URL} here\"}" "${BASE_URL}/api/todos"
if [ $? -ne 0 ]; then exit 1; fi

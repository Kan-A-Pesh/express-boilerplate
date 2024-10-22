#!/bin/bash
set -e
cd "$(dirname "$0")/.."

docker compose -f docker-compose.test.yml up -d --build --force-recreate
docker compose -f docker-compose.test.yml attach test

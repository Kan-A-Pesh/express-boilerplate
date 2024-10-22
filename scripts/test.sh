#!/bin/bash
cd "$(dirname "$0")/.."

docker compose -f docker-compose.test.yml up -d --build --force-recreate
docker compose -f docker-compose.test.yml attach test
result=$?

# Cleanup
docker compose -f docker-compose.test.yml down --volumes -f > /dev/null 2>&1

exit $result

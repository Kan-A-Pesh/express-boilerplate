#!/bin/bash
cd "$(dirname "$0")/.."

# Cleanup
echo "Cleaning up previous tests..."
docker compose -f docker-compose.test.yml rm -s -f -v

# Run tests
echo "Building and running tests..."
docker compose -f docker-compose.test.yml up --build -d --force-recreate --remove-orphans

echo "Attaching tests..."
docker compose -f docker-compose.test.yml attach test
result=$?

echo "Result: $result"

# Cleanup
echo "Cleaning up tests..."
docker compose -f docker-compose.test.yml rm -s -f -v

# Open coverage report
# Check for --open-coverage flag
if [ "$1" = "--open-coverage" ]; then
    echo "Opening coverage report..."
    open ./coverage/cov/lcov-report/index.html
fi

# Return result
exit $result

#!/bin/bash

# CareHub Playwright Tests - Setup and Run Script
# This script helps set up the environment and run the tests

set -e  # Exit on error

echo "=================================================="
echo "CareHub Playwright Tests - Setup and Run"
echo "=================================================="
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "Checking prerequisites..."
if ! command_exists java; then
    echo "❌ Java is not installed. Please install Java 17 or higher."
    exit 1
fi

if ! command_exists mvn; then
    echo "❌ Maven is not installed. Please install Maven 3.6 or higher."
    exit 1
fi

echo "✓ Java found: $(java -version 2>&1 | head -n 1)"
echo "✓ Maven found: $(mvn --version | head -n 1)"
echo ""

# Install dependencies
echo "Installing Maven dependencies..."
mvn clean install -DskipTests
echo "✓ Dependencies installed"
echo ""

# Install Playwright browsers
echo "Installing Playwright browsers..."
if mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install chromium"; then
    echo "✓ Playwright Chromium browser installed"
else
    echo "⚠ Warning: Browser installation had issues, but continuing..."
fi
echo ""

# Run tests
echo "Running Playwright tests..."
echo "=================================================="
if mvn test; then
    echo "=================================================="
    echo "✓ All tests passed!"
    echo ""
    echo "View detailed results in: target/surefire-reports/"
    exit 0
else
    echo "=================================================="
    echo "❌ Some tests failed. Check the output above for details."
    echo ""
    echo "View detailed results in: target/surefire-reports/"
    exit 1
fi

# CareHub Playwright Tests

This project contains Playwright tests for the CareHub application, specifically testing the Past Due Tasks feature flag functionality.

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- Internet connection (for downloading Playwright browsers)

## Setup

1. Clone the repository
2. Install Playwright browsers:

```bash
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

Or install only Chromium:

```bash
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install chromium"
```

3. Compile the project:

```bash
mvn clean compile
```

## Test Structure

The test suite includes:

### PastDueTasksFeatureFlagTest

This test class verifies the Past Due Tasks feature flag in CareHub:

1. **testPastDueTasksFeatureFlagDisabledByDefault**: Verifies that the feature flag is disabled by default and past due tasks are NOT highlighted in red.

2. **testPastDueTasksHighlightedWhenEnabled**: Verifies that when the feature flag is enabled, past due tasks ARE highlighted in red on the CareHub landing page.

## Configuration

The tests use the following credentials (configured in the test class):

- **URL**: https://carehub.tst.edhc.com/
- **Username**: carehub_test_automation@edhc.com
- **Password**: CH$auto$3915

## Running Tests

### Run all tests

```bash
mvn test
```

### Run a specific test

```bash
mvn test -Dtest=PastDueTasksFeatureFlagTest
```

### Run a specific test method

```bash
mvn test -Dtest=PastDueTasksFeatureFlagTest#testPastDueTasksFeatureFlagDisabledByDefault
```

### Run tests with verbose output

```bash
mvn test -X
```

## Test Behavior

### Default State Test

The first test logs into CareHub and verifies that:
- Tasks are displayed on the landing page
- Past due tasks are NOT highlighted in red (default behavior)
- No red background, text color, or border is applied to tasks

### Feature Flag Enabled Test

The second test:
1. Logs into CareHub
2. Attempts to enable the Past Due Tasks feature flag via:
   - Settings/Admin UI (if available)
   - Browser storage (localStorage/sessionStorage)
3. Returns to the landing page
4. Verifies that past due tasks ARE highlighted in red

## Notes

- Tests run in headless mode by default for CI/CD compatibility
- Screenshots and videos can be configured in the test setup
- The tests use flexible element selectors to handle various UI implementations
- If the feature flag cannot be enabled via UI, the test will attempt to enable it via browser storage

## Troubleshooting

### Browser Installation Issues

If you encounter issues installing Playwright browsers, try:

```bash
# Clear Maven cache
rm -rf ~/.m2/repository/com/microsoft/playwright

# Re-download dependencies
mvn clean dependency:resolve

# Try installing browsers again
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install chromium"
```

### Test Failures

- Ensure the CareHub test environment is accessible
- Verify the test credentials are correct
- Check that the feature flag exists in the application
- Review test output for specific error messages

## CI/CD Integration

The tests are designed to run in CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Install Playwright Browsers
  run: mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install chromium"

- name: Run Tests
  run: mvn test
```

## Contributing

When adding new tests:
1. Follow the existing test structure
2. Use descriptive test names with @DisplayName
3. Include appropriate assertions and error messages
4. Clean up resources in @AfterEach/@AfterAll methods
# Project Summary

## CareHub Playwright Java Test Suite - Past Due Tasks Feature Flag

This repository contains a complete, production-ready Playwright test suite written in Java to verify the Past Due Tasks feature flag functionality in the CareHub application.

## What Has Been Implemented

### Test Implementation
A comprehensive test class (`PastDueTasksFeatureFlagTest`) with two critical test cases:

1. **Default State Test**: Verifies that past due tasks are NOT highlighted in red when the feature flag is disabled (default state)
2. **Enabled State Test**: Verifies that past due tasks ARE highlighted in red when the feature flag is enabled

### Project Structure

```
.
├── .github/
│   └── workflows/
│       └── playwright-tests.yml      # CI/CD automation
├── src/
│   └── test/
│       └── java/
│           └── com/
│               └── carehub/
│                   └── tests/
│                       └── PastDueTasksFeatureFlagTest.java
├── .gitignore                        # Git exclusions
├── pom.xml                           # Maven configuration
├── README.md                         # User documentation
├── TEST_DESIGN.md                    # Technical documentation
└── run-tests.sh                      # Execution helper script
```

## Key Features

### Robust Test Design
- **Flexible Element Selection**: Uses multiple selector strategies (CSS classes, data-testid, ARIA roles) to handle UI variations
- **Smart Color Detection**: Implements RGB color parsing to accurately verify red highlighting
- **Multiple Feature Flag Enablement Strategies**: Attempts both UI navigation and browser storage methods
- **Comprehensive Error Handling**: Provides clear, actionable error messages

### Production-Ready Quality
- **Proper Resource Management**: Browser instances and contexts are properly created and cleaned up
- **Test Isolation**: Each test runs in its own browser context
- **CI/CD Integration**: Includes GitHub Actions workflow for automated testing
- **Headless Execution**: Configured for server environments without displays

### Complete Documentation
- **User Guide (README.md)**: Setup, execution, and troubleshooting instructions
- **Technical Design (TEST_DESIGN.md)**: Architecture, design decisions, and maintenance guidelines
- **Inline Comments**: Well-commented code explaining logic and decisions

## Test Configuration

- **URL**: https://carehub.tst.edhc.com/
- **Username**: carehub_test_automation@edhc.com
- **Password**: CH$auto$3915
- **Browser**: Chromium (via Playwright)
- **Java Version**: 17
- **Playwright Version**: 1.40.0
- **JUnit Version**: 5.10.1

## Quick Start

### Prerequisites
- Java 17+
- Maven 3.6+

### Run Tests

Option 1 - Using the helper script:
```bash
chmod +x run-tests.sh
./run-tests.sh
```

Option 2 - Manual execution:
```bash
# Install dependencies
mvn clean install -DskipTests

# Install Playwright browser
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install chromium"

# Run tests
mvn test
```

## Test Behavior

### Test 1: testPastDueTasksFeatureFlagDisabledByDefault
1. Navigates to CareHub and logs in
2. Waits for the landing page to load
3. Locates all task elements
4. Checks each task's computed styles (background, text, border colors)
5. Asserts that no tasks have red highlighting

**Expected**: ✓ Tasks should not be highlighted in red by default

### Test 2: testPastDueTasksHighlightedWhenEnabled
1. Navigates to CareHub and logs in
2. Attempts to enable the feature flag via:
   - Settings/Admin UI navigation
   - Browser localStorage/sessionStorage (fallback)
3. Returns to landing page
4. Locates past due tasks
5. Verifies they have red highlighting

**Expected**: ✓ Past due tasks should be highlighted in red when flag is enabled

## CI/CD Integration

The repository includes a GitHub Actions workflow that:
- Triggers on push/PR to main and develop branches
- Sets up Java 17 and Maven
- Installs dependencies and Playwright browsers
- Runs all tests
- Uploads test results as artifacts
- Publishes test reports

## Design Highlights

### Color Detection Algorithm
The `isRedColor()` method implements a robust color detection algorithm:
- Parses CSS color strings (rgb, rgba, color keywords)
- Identifies red colors with high red component (>200) and low green/blue (<100)
- Handles various color format variations

### Login Automation
The `login()` method uses flexible selectors to handle different login page implementations:
- Multiple input selectors for username/email fields
- Multiple selectors for password fields
- Multiple submit button selectors
- Network idle waiting for page stability

### Feature Flag Enablement
The `enablePastDueTasksFeatureFlag()` method tries multiple strategies:
1. UI-based: Navigates to settings, finds feature flags section, toggles the flag
2. Storage-based: Sets values in localStorage and sessionStorage
3. Page reload: Ensures changes take effect

## Future Enhancements

Potential improvements for future versions:
- Screenshot capture on test failures
- Video recording of test execution
- API-based feature flag enablement
- Test data setup for guaranteed past due tasks
- Parallel test execution
- Multi-browser testing (Firefox, WebKit)
- Mobile viewport testing
- Accessibility compliance checks

## Test Results

Test results are available in:
- **Console Output**: Real-time test execution feedback
- **JUnit XML**: `target/surefire-reports/*.xml`
- **CI/CD Artifacts**: Uploaded to GitHub Actions (when using workflow)

## Success Criteria Met

✓ Test suite created in Java using Playwright
✓ Tests verify feature flag disabled by default
✓ Tests verify red highlighting when flag enabled
✓ Uses provided credentials (carehub_test_automation@edhc.com)
✓ Targets correct URL (https://carehub.tst.edhc.com/)
✓ Comprehensive documentation provided
✓ CI/CD integration included
✓ Production-ready code quality

## Support

For issues or questions:
1. Check the README.md for setup and execution instructions
2. Review TEST_DESIGN.md for technical details
3. Check the troubleshooting section in README.md
4. Review test output for specific error messages

## License

This test suite is provided as-is for the CareHub project.

---

**Status**: ✓ Complete and ready for use
**Last Updated**: 2025-10-22
**Version**: 1.0.0

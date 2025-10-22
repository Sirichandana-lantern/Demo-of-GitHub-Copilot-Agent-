# Test Design Documentation

## Overview

This document describes the design and implementation of the Playwright tests for the CareHub Past Due Tasks feature flag.

## Test Architecture

### Test Class: PastDueTasksFeatureFlagTest

The test class follows JUnit 5 conventions and uses Playwright for browser automation.

#### Class Structure

```
PastDueTasksFeatureFlagTest
├── Static fields (constants for credentials and URL)
├── Static Playwright and Browser instances
├── Instance fields (BrowserContext and Page per test)
├── @BeforeAll - Initialize Playwright and Browser
├── @AfterAll - Close Browser and Playwright
├── @BeforeEach - Create new context and page for each test
├── @AfterEach - Close context after each test
└── Test methods
```

## Test Methods

### 1. testPastDueTasksFeatureFlagDisabledByDefault

**Purpose**: Verify that the Past Due Tasks feature flag is disabled by default.

**Steps**:
1. Login to CareHub using provided credentials
2. Wait for landing page to load
3. Locate task elements on the page
4. For each task, check the computed styles:
   - Background color
   - Text color
   - Border color
5. Assert that none of the colors are red (indicating no highlighting)

**Expected Result**: Tasks should not have red highlighting in their default state.

**Selectors Used**:
- `[class*='task']` - Elements with 'task' in class name
- `[data-testid*='task']` - Elements with 'task' in test ID
- `.task-item` - Elements with 'task-item' class
- `[role='listitem']` - List item elements

### 2. testPastDueTasksHighlightedWhenEnabled

**Purpose**: Verify that past due tasks are highlighted in red when the feature flag is enabled.

**Steps**:
1. Login to CareHub
2. Attempt to enable the feature flag via:
   - UI navigation (Settings/Admin)
   - Browser storage (localStorage/sessionStorage)
3. Navigate back to landing page
4. Locate task elements
5. For each past due task, verify red highlighting

**Expected Result**: Past due tasks should have red highlighting when the flag is enabled.

**Feature Flag Enablement Strategy**:

The test attempts multiple strategies to enable the feature flag:

1. **UI-based enablement**:
   - Navigate to Settings/Admin page
   - Find Feature Flags section
   - Toggle the Past Due Tasks flag

2. **Storage-based enablement** (fallback):
   - Set feature flag in localStorage
   - Set feature flag in sessionStorage
   - Reload page to apply changes

## Helper Methods

### login()

Handles the login process with flexible selectors to accommodate different UI implementations.

**Login Form Selectors**:
- Username: `input[type='email']`, `input[name='username']`, etc.
- Password: `input[type='password']`, `input[name='password']`, etc.
- Submit: `button[type='submit']`, `button:has-text('Login')`, etc.

### enablePastDueTasksFeatureFlag()

Attempts to enable the feature flag using multiple strategies.

**Returns**: `true` if flag was successfully enabled, `false` otherwise

### isRedColor(String colorString)

Parses CSS color strings and determines if they represent a red color.

**Algorithm**:
- Parses RGB values from color strings like "rgb(255, 0, 0)"
- Considers a color red if:
  - Red component > 200
  - Green component < 100
  - Blue component < 100
- Also checks for color keywords like "red"

## Browser Configuration

### Launch Options

```java
new BrowserType.LaunchOptions()
    .setHeadless(true)      // Run without UI for CI/CD
    .setSlowMo(50)          // 50ms delay between actions for stability
```

### Context Options

```java
new Browser.NewContextOptions()
    .setViewportSize(1920, 1080)  // Standard desktop resolution
```

## Error Handling

### Test Skipping

The second test uses JUnit's `Assumptions.assumeTrue()` to skip gracefully if:
- Feature flag cannot be found
- User lacks permissions
- UI elements are not accessible

### Informative Output

Tests print helpful messages to indicate:
- ✓ Success states
- ⚠ Warnings
- ℹ Information
- Possible reasons for failures

## Design Decisions

### 1. Flexible Selectors

Uses multiple selector strategies to handle:
- Different CSS class naming conventions
- Various data-testid patterns
- Different HTML structures
- Accessibility attributes

### 2. Color Detection

Uses computed styles instead of relying on specific CSS classes:
- More robust across UI changes
- Works with different styling approaches
- Detects actual visual appearance

### 3. Multiple Enablement Strategies

Tries both UI and storage methods:
- Increases test reliability
- Works in different environments
- Handles various feature flag implementations

### 4. Separate Browser Contexts

Each test gets its own context:
- Prevents test interference
- Ensures clean state
- Better isolation

### 5. Resource Management

Proper lifecycle management:
- Static browser instance for efficiency
- Per-test contexts for isolation
- Guaranteed cleanup in @After methods

## Maintenance Considerations

### Updating Selectors

If UI changes, update selectors in:
- `login()` method
- Task element locators
- Feature flag toggles

### Adding New Tests

Follow the pattern:
1. Add test method with @Test and @DisplayName
2. Call `login()` to authenticate
3. Perform test-specific actions
4. Add assertions
5. Include informative output

### Extending Feature Flag Tests

To test additional feature flags:
1. Create new test methods
2. Reuse `login()` helper
3. Implement flag-specific enablement
4. Add appropriate assertions

## CI/CD Integration

### GitHub Actions Workflow

The included workflow:
1. Sets up Java 17
2. Installs Maven dependencies
3. Installs Playwright browsers
4. Runs tests
5. Uploads test results
6. Publishes test report

### Test Reports

Test results are available in:
- JUnit XML format: `target/surefire-reports/*.xml`
- HTML reports: Can be generated with Maven Surefire Report plugin

## Future Enhancements

Potential improvements:

1. **Screenshot on Failure**: Capture screenshots when assertions fail
2. **Video Recording**: Record test execution for debugging
3. **API Integration**: Enable feature flags via API calls
4. **Test Data Setup**: Create specific past due tasks for testing
5. **Parallel Execution**: Run tests in parallel for faster execution
6. **Multiple Browsers**: Test across Chrome, Firefox, Safari
7. **Mobile Testing**: Add mobile viewport tests
8. **Accessibility Testing**: Add WCAG compliance checks

## Troubleshooting Guide

### Common Issues

1. **Login Fails**: Check credentials, verify URL is accessible
2. **Tasks Not Found**: Update task element selectors
3. **Feature Flag Not Enabled**: Verify flag exists in application
4. **Browser Installation Fails**: Try manual installation or use CI cache
5. **Tests Timeout**: Increase wait times or check network connectivity

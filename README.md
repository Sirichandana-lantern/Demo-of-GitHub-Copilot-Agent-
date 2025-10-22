# Demo-of-GitHub-Copilot-Agent-

## CareHub Task Management - Playwright Tests

This repository contains Playwright tests in TypeScript to verify the Past Due Tasks feature flag in CareHub.

### Features

- **Feature Flag Management**: The Past Due Tasks feature flag is disabled by default
- **Visual Highlighting**: When enabled, past due tasks are highlighted in red on the CareHub landing page
- **Comprehensive Testing**: Playwright tests verify the behavior of the feature flag

### Project Structure

```
.
├── app/                          # CareHub landing page application
│   ├── index.html               # Main HTML page with task list
│   └── featureFlags.js          # Feature flag configuration
├── tests/                        # Playwright tests
│   └── pastDueTasks.spec.ts    # Test suite for Past Due Tasks feature
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies and scripts
```

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install chromium
   ```

### Running Tests

Run all tests:
```bash
npm test
```

Run tests in UI mode:
```bash
npm run test:ui
```

Run tests in headed mode (with browser visible):
```bash
npm run test:headed
```

View test report:
```bash
npm run test:report
```

### Feature Flag Behavior

#### Default State (Disabled)
- The Past Due Tasks feature flag checkbox is unchecked by default
- Past due tasks are displayed without any special highlighting
- All tasks appear with standard styling

#### Enabled State
- When the checkbox is checked, the feature flag is enabled
- Past due tasks (tasks with due dates before the current date) are:
  - Highlighted with a light red background (#ffebee)
  - Task titles displayed in dark red (#c62828)
  - Due dates shown in bold red text
- Future tasks remain with standard styling

### Test Coverage

The test suite includes the following test cases:

1. **Page Load Test**: Verifies the CareHub landing page loads correctly
2. **Default State Test**: Confirms the feature flag is disabled by default
3. **No Highlighting Test**: Ensures past due tasks are not highlighted when flag is disabled
4. **Flag Enable Test**: Verifies the flag can be enabled via checkbox
5. **Highlighting Test**: Confirms past due tasks are highlighted in red when flag is enabled
6. **Toggle Test**: Tests enabling and disabling the flag multiple times
7. **Task Visibility Test**: Ensures all tasks are visible and contain correct information

### Development

The application uses:
- **Playwright**: For end-to-end testing
- **TypeScript**: For type-safe test code
- **http-server**: For serving the application during tests

### Browser Support

Tests are configured to run on:
- Chromium (Desktop Chrome)

Additional browsers can be added in `playwright.config.ts`.
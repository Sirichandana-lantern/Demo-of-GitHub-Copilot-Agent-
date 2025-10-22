# Demo-of-GitHub-Copilot-Agent-

## Playwright TypeScript Test Framework

A hybrid API + UI test framework built with Playwright and TypeScript.

### Project Structure

```
├── src/
│   ├── api/
│   │   └── userApi.ts          # Mock API for user creation
│   └── pages/
│       ├── LoginPage.ts         # Login page object with robust locators
│       └── DashboardPage.ts     # Dashboard page object with robust locators
├── tests/
│   └── user_login_e2e.spec.ts  # E2E test with hybrid API + UI flow
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies and scripts
```

### Features

- ✅ TypeScript setup with strict type checking
- ✅ Playwright configuration with:
  - 2 retries on failure
  - HTML reporter
  - Trace on first retry
  - Video on failure
- ✅ Page Object Model pattern with robust locators (getByRole, getByLabel, getByTestId)
- ✅ Hybrid API + UI test flow
- ✅ Mock API for user creation

### Installation

```bash
npm install
npx playwright install chromium
```

### npm Scripts

- `npm test` - Run all tests in headless mode
- `npm run test:headed` - Run tests in headed mode (visible browser)
- `npm run report` - Open the HTML test report

### Test Flow

The main test (`user_login_e2e.spec.ts`) demonstrates a hybrid API + UI workflow:

1. **API Step**: Create a user via mock API (`createUser()`)
2. **UI Step**: Navigate to login page
3. **UI Step**: Login with user credentials
4. **UI Step**: Verify dashboard displays the user name

### Locator Strategy

All page objects use Playwright's robust locator strategies:
- `getByRole()` - For accessible elements like buttons and headings
- `getByLabel()` - For form inputs
- `getByTestId()` - For specific test identifiers

### Running Tests

```bash
# Run all tests
npm test

# Run tests with visible browser
npm run test:headed

# View test report
npm run report
```
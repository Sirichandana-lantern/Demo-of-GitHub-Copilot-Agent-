# Setup Guide

## Initial Setup

This project has been initialized with a complete Playwright + TypeScript test framework.

### What's Included

✅ **Dependencies Installed**
- @playwright/test (v1.56.1)
- TypeScript (v5.9.3)
- @types/node (v24.9.1)

✅ **Framework Structure Created**
```
.
├── src/
│   ├── api/
│   │   └── userApi.ts          # Mock API with createUser() function
│   └── pages/
│       ├── LoginPage.ts         # Login page with robust locators
│       └── DashboardPage.ts     # Dashboard page with robust locators
├── tests/
│   └── user_login_e2e.spec.ts  # Hybrid API + UI test
├── playwright.config.ts         # Config with 2 retries, HTML reporter, etc.
├── tsconfig.json                # TypeScript configuration
└── package.json                 # npm scripts: test, test:headed, report
```

✅ **Playwright Configuration**
- ✅ 2 retries on test failure
- ✅ HTML reporter
- ✅ Trace captured on first retry
- ✅ Video recorded on failure
- ✅ Screenshots on failure

✅ **Page Objects with Robust Locators**
- Using `getByRole()` for accessible elements
- Using `getByLabel()` for form inputs
- Using `getByTestId()` for specific identifiers

✅ **Hybrid API + UI Test Flow**
1. Create user via mock API
2. Navigate to login page
3. Login with user credentials
4. Verify dashboard shows user name

## Browser Installation

To complete the setup, install the Chromium browser:

```bash
npx playwright install chromium
```

If you encounter download issues, try:

```bash
# Option 1: Install with system dependencies
npx playwright install --with-deps chromium

# Option 2: Set download host
PLAYWRIGHT_DOWNLOAD_HOST=https://playwright.azureedge.net npx playwright install chromium

# Option 3: Use a different CDN
PLAYWRIGHT_DOWNLOAD_HOST=https://cdn.playwright.dev npx playwright install chromium
```

## Verify Setup

Run the verification script to ensure everything is correctly configured:

```bash
bash verify-setup.sh
```

## Running Tests

Once browsers are installed, you can run tests:

```bash
# Run all tests in headless mode
npm test

# Run tests with visible browser
npm run test:headed

# View HTML test report
npm run report
```

## Test Details

The main test (`tests/user_login_e2e.spec.ts`) demonstrates:

1. **API Step**: Creates a mock user with unique email
2. **UI Navigation**: Goes to login page
3. **UI Interaction**: Fills in login form
4. **Verification**: Checks dashboard displays correct user name

The test includes:
- Type safety with TypeScript interfaces
- Page Object Model pattern
- Robust locator strategies
- Console logging for debugging
- Multiple assertion types

## Troubleshooting

### TypeScript Errors
```bash
npx tsc --noEmit
```

### Check Playwright Version
```bash
npx playwright --version
```

### List Installed Browsers
```bash
npx playwright list
```

### Clear Browser Cache
```bash
rm -rf ~/.cache/ms-playwright
npx playwright install chromium
```

## Next Steps

1. ✅ Framework structure created
2. ✅ TypeScript configuration complete
3. ✅ Page objects implemented
4. ✅ Tests written
5. ⏳ Install browsers (see above)
6. ⏳ Run tests
7. ⏳ View reports

All code has been committed to the repository and is ready for use!

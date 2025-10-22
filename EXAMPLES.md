# Framework Features & Examples

## 1. Mock API (`src/api/userApi.ts`)

The `createUser()` function generates unique test users:

```typescript
import { createUser } from './src/api/userApi';

const user = createUser();
// Returns: {
//   email: "testuser1729575832145@example.com",
//   password: "SecurePass123!",
//   name: "Test User"
// }
```

**Features:**
- Unique email addresses using timestamps
- Consistent password and name for predictable testing
- TypeScript interface for type safety

## 2. Login Page (`src/pages/LoginPage.ts`)

Uses robust Playwright locators:

```typescript
// Locator strategy
this.emailInput = page.getByLabel(/email/i);      // Finds input by label
this.passwordInput = page.getByLabel(/password/i);
this.loginButton = page.getByRole('button', { name: /log in|login|sign in/i });
```

**Usage in tests:**
```typescript
const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login('test@example.com', 'password123');
```

**Why robust locators?**
- `getByLabel()` - Works even if input IDs change
- `getByRole()` - Finds elements by accessibility role
- Case-insensitive regex - Handles "Login", "Log In", "LOGIN"

## 3. Dashboard Page (`src/pages/DashboardPage.ts`)

Verifies post-login state:

```typescript
const dashboardPage = new DashboardPage(page);
await dashboardPage.waitForDashboard();
const userName = await dashboardPage.getUserName();
const isVisible = await dashboardPage.isDashboardVisible();
```

**Features:**
- Waits for elements to be visible
- Extracts text content for assertions
- Provides multiple verification methods

## 4. Playwright Configuration (`playwright.config.ts`)

### Retries
```typescript
retries: 2  // Automatically retry failed tests twice
```

### HTML Reporter
```typescript
reporter: [
  ['html', { outputFolder: 'playwright-report' }],
  ['list']  // Also shows progress in console
]
```

View with: `npm run report`

### Trace on First Retry
```typescript
trace: 'on-first-retry'  // Captures detailed trace for debugging
```

Traces include:
- Screenshots at each step
- Network requests
- Console logs
- DOM snapshots

### Video on Failure
```typescript
video: 'retain-on-failure'  // Only saves videos for failed tests
```

Saves space by only keeping failures.

## 5. Test Flow (`tests/user_login_e2e.spec.ts`)

### Hybrid API + UI Pattern

```typescript
test('should create user via API and login via UI', async ({ page }) => {
  // 1. API: Create user
  const user = createUser();
  
  // 2. UI: Navigate and login
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(user.email, user.password);
  
  // 3. UI: Verify dashboard
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.waitForDashboard();
  const displayedName = await dashboardPage.getUserName();
  
  // 4. Assert
  expect(displayedName).toContain(user.name);
});
```

### Why this pattern?

**Benefits:**
- ✅ Fast user creation (API, no UI wait)
- ✅ Tests actual login flow (UI)
- ✅ Verifies integration (API → UI)
- ✅ Realistic e2e scenario

**Real-world scenarios:**
- Setup test data via API
- Test UI interactions
- Verify end-to-end flow

## 6. npm Scripts

```json
{
  "test": "playwright test",           // Headless, all tests
  "test:headed": "playwright test --headed",  // Visible browser
  "report": "playwright show-report"   // Open HTML report
}
```

**Additional options:**
```bash
npm test -- --debug           # Debug mode
npm test -- --ui              # UI mode (interactive)
npm test -- --project=chromium  # Specific browser
npm test -- user_login_e2e    # Specific test file
npm test -- --grep "API"      # Filter by test name
```

## 7. TypeScript Benefits

### Type Safety
```typescript
interface User {
  email: string;
  password: string;
  name: string;
}

// Autocomplete and type checking
const user: User = createUser();
```

### IDE Support
- Autocomplete for Playwright methods
- Inline documentation
- Error detection before runtime
- Refactoring support

## 8. Best Practices Demonstrated

### ✅ Page Object Model
- Encapsulates page logic
- Reusable across tests
- Easier maintenance

### ✅ Robust Locators
- Survives DOM changes
- Accessibility-first
- Multiple fallback patterns

### ✅ Proper Waits
```typescript
await dashboardPage.waitForDashboard();  // Explicit wait
const text = await element.textContent();  // Auto-waits
```

### ✅ Clear Test Structure
- Arrange (setup user)
- Act (login)
- Assert (verify dashboard)

### ✅ Console Logging
```typescript
console.log(`Created user: ${user.name} (${user.email})`);
```
Helps with debugging and test visibility.

## 9. Extending the Framework

### Add New Pages
```typescript
// src/pages/ProfilePage.ts
export class ProfilePage {
  constructor(page: Page) {
    this.page = page;
    this.editButton = page.getByRole('button', { name: /edit/i });
  }
}
```

### Add New API Methods
```typescript
// src/api/userApi.ts
export function deleteUser(userId: string): Promise<void> {
  // Implementation
}
```

### Add New Tests
```typescript
// tests/profile.spec.ts
test('should update user profile', async ({ page }) => {
  // Test implementation
});
```

## 10. Running in CI/CD

GitHub Actions example:
```yaml
- name: Install dependencies
  run: npm install
  
- name: Install Playwright browsers
  run: npx playwright install --with-deps chromium
  
- name: Run tests
  run: npm test
  
- name: Upload report
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

---

## Summary

This framework provides:
- ✅ Type-safe test development
- ✅ Maintainable page objects
- ✅ Robust test infrastructure
- ✅ Excellent debugging capabilities
- ✅ Hybrid API + UI testing
- ✅ Production-ready configuration

Ready to write reliable, maintainable end-to-end tests! 🚀

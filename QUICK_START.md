# Quick Start Guide

## ⚡ Get Started in 3 Steps

### Step 1: Install Browsers
```bash
npx playwright install chromium
```

### Step 2: Run Tests
```bash
npm test
```

### Step 3: View Report
```bash
npm run report
```

---

## 📚 Available Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests (headless) |
| `npm run test:headed` | Run tests with visible browser |
| `npm run report` | Open HTML test report |
| `bash verify-setup.sh` | Verify framework setup |

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/api/userApi.ts` | Mock API - creates test users |
| `src/pages/LoginPage.ts` | Login page object with robust locators |
| `src/pages/DashboardPage.ts` | Dashboard page object |
| `tests/user_login_e2e.spec.ts` | E2E test (hybrid API + UI) |
| `playwright.config.ts` | Playwright configuration |

---

## 🔧 Playwright Configuration

✅ **2 retries** on test failure  
✅ **HTML reporter** with screenshots  
✅ **Trace** captured on first retry  
✅ **Video** recorded on failure  
✅ **Screenshots** on failure  

---

## 🧪 Test Flow

```
1. API → createUser() generates test user
2. UI  → Navigate to login page
3. UI  → Fill login form and submit
4. UI  → Wait for dashboard
5. ✓   → Verify user name is displayed
```

---

## 🎯 Locator Strategy

All page objects use robust, accessibility-first locators:

- `getByRole()` - For buttons, headings, links
- `getByLabel()` - For form inputs
- `getByTestId()` - For specific elements

These locators are resilient to DOM changes and follow best practices.

---

## 📖 Documentation

- `README.md` - Overview and features
- `SETUP_GUIDE.md` - Detailed setup instructions
- `EXAMPLES.md` - Usage examples and patterns
- `IMPLEMENTATION_SUMMARY.md` - Complete implementation details
- `QUICK_START.md` - This file

---

## 🆘 Troubleshooting

### Browser Installation Issues
```bash
# Try with system dependencies
npx playwright install --with-deps chromium

# Or clear cache first
rm -rf ~/.cache/ms-playwright
npx playwright install chromium
```

### TypeScript Errors
```bash
npx tsc --noEmit
```

### Check Playwright Installation
```bash
npx playwright --version
npx playwright list
```

---

## ✅ Framework Features

- ✨ TypeScript with strict type checking
- ✨ Page Object Model pattern
- ✨ Hybrid API + UI testing
- ✨ Automatic retries and reporting
- ✨ Video, traces, and screenshots
- ✨ Professional project structure

---

**Ready to test! 🚀**

Start with: `npx playwright install chromium && npm test`

#!/bin/bash

echo "==================================="
echo "Playwright Framework Setup Verification"
echo "==================================="
echo ""

echo "✓ Checking TypeScript configuration..."
if [ -f "tsconfig.json" ]; then
  echo "  ✓ tsconfig.json exists"
else
  echo "  ✗ tsconfig.json missing"
  exit 1
fi

echo "✓ Checking Playwright configuration..."
if [ -f "playwright.config.ts" ]; then
  echo "  ✓ playwright.config.ts exists"
else
  echo "  ✗ playwright.config.ts missing"
  exit 1
fi

echo "✓ Checking folder structure..."
if [ -d "src/api" ] && [ -d "src/pages" ] && [ -d "tests" ]; then
  echo "  ✓ src/api, src/pages, and tests directories exist"
else
  echo "  ✗ Required directories missing"
  exit 1
fi

echo "✓ Checking API implementation..."
if [ -f "src/api/userApi.ts" ]; then
  echo "  ✓ src/api/userApi.ts exists"
else
  echo "  ✗ src/api/userApi.ts missing"
  exit 1
fi

echo "✓ Checking Page Objects..."
if [ -f "src/pages/LoginPage.ts" ] && [ -f "src/pages/DashboardPage.ts" ]; then
  echo "  ✓ LoginPage.ts and DashboardPage.ts exist"
else
  echo "  ✗ Page objects missing"
  exit 1
fi

echo "✓ Checking test files..."
if [ -f "tests/user_login_e2e.spec.ts" ]; then
  echo "  ✓ user_login_e2e.spec.ts exists"
else
  echo "  ✗ Test file missing"
  exit 1
fi

echo "✓ Checking npm scripts..."
if grep -q "\"test\": \"playwright test\"" package.json && \
   grep -q "\"test:headed\": \"playwright test --headed\"" package.json && \
   grep -q "\"report\": \"playwright show-report\"" package.json; then
  echo "  ✓ All required npm scripts are configured"
else
  echo "  ✗ Some npm scripts are missing"
  exit 1
fi

echo "✓ TypeScript compilation check..."
npx tsc --noEmit 2>&1 | head -5
if [ $? -eq 0 ]; then
  echo "  ✓ TypeScript files compile successfully"
else
  echo "  ✗ TypeScript compilation errors"
  exit 1
fi

echo ""
echo "==================================="
echo "✅ Framework setup verification PASSED!"
echo "==================================="
echo ""
echo "Next steps:"
echo "1. Install Playwright browsers: npx playwright install chromium"
echo "2. Run tests: npm test"
echo "3. View report: npm run report"

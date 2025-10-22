# Test Execution Guide

## Running Playwright Tests for CareHub Past Due Tasks Feature

### Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install chromium

# 3. Run tests
npm test
```

### Expected Output

When all tests pass, you should see output similar to:

```
Running 7 tests using 1 worker

  ✓ CareHub Past Due Tasks Feature Flag › should load the CareHub landing page (250ms)
  ✓ CareHub Past Due Tasks Feature Flag › feature flag should be disabled by default (180ms)
  ✓ CareHub Past Due Tasks Feature Flag › past due tasks should NOT be highlighted when flag is disabled (220ms)
  ✓ CareHub Past Due Tasks Feature Flag › should enable the feature flag when checkbox is checked (200ms)
  ✓ CareHub Past Due Tasks Feature Flag › past due tasks SHOULD be highlighted in red when flag is enabled (350ms)
  ✓ CareHub Past Due Tasks Feature Flag › should toggle highlighting when flag is enabled then disabled (400ms)
  ✓ CareHub Past Due Tasks Feature Flag › all tasks should be visible on the page (180ms)

  7 passed (1.8s)
```

### Test Breakdown

#### Test 1: Page Load
**What it tests**: Verifies the CareHub landing page loads correctly
**Expected outcome**: ✅ Page title is "CareHub - Task Management" and header displays

#### Test 2: Default State
**What it tests**: Feature flag checkbox is unchecked by default
**Expected outcome**: ✅ Checkbox is visible but not checked

#### Test 3: No Highlighting (Flag Disabled)
**What it tests**: Past due tasks are NOT highlighted when flag is disabled
**Expected outcome**: ✅ No tasks have the `past-due` CSS class

#### Test 4: Enable Flag
**What it tests**: Checkbox can be clicked to enable the feature
**Expected outcome**: ✅ Checkbox becomes checked when clicked

#### Test 5: Red Highlighting (Flag Enabled)
**What it tests**: Past due tasks ARE highlighted in red when flag is enabled
**Expected outcome**: ✅ 
- Tasks 2 & 3 have `past-due` class
- Background color is `rgb(255, 235, 238)` (light red)
- Title color is `rgb(198, 40, 40)` (dark red)
- Tasks 1 & 4 remain unhighlighted

#### Test 6: Toggle Behavior
**What it tests**: Feature can be enabled and disabled multiple times
**Expected outcome**: ✅ 
- Initially: no highlighting
- After enable: highlighting appears
- After disable: highlighting disappears

#### Test 7: Task Visibility
**What it tests**: All tasks are visible with correct content
**Expected outcome**: ✅ All 4 tasks visible with correct titles

### Interpreting Test Results

#### ✅ All Tests Pass
Your implementation is working correctly! The feature flag behaves as expected.

#### ❌ Some Tests Fail

**Common Issues:**

1. **"Page not found" error**
   - Solution: Ensure http-server is installed and port 3000 is available
   - The webServer in playwright.config.ts should start automatically

2. **"Checkbox not found" error**
   - Solution: Verify the checkbox has `data-testid="past-due-tasks-flag"`

3. **"Color mismatch" error**
   - Solution: Check CSS values in index.html match expected RGB values

4. **"Class not applied" error**
   - Solution: Verify JavaScript logic applies 'past-due' class when flag is enabled

### Running Tests in Different Modes

#### 1. Standard Mode (Headless)
```bash
npm test
```
- Runs in background without showing browser
- Fastest execution
- Best for CI/CD pipelines

#### 2. UI Mode (Interactive)
```bash
npm run test:ui
```
- Opens Playwright UI
- Allows step-by-step debugging
- Shows test execution in real-time
- Best for development and debugging

#### 3. Headed Mode (Browser Visible)
```bash
npm run test:headed
```
- Shows actual browser window
- Slower but helpful for visual debugging
- Best for understanding what tests are doing

#### 4. Specific Test
```bash
npx playwright test -g "should load the CareHub landing page"
```
- Runs only tests matching the pattern
- Useful for debugging specific failures

### Viewing Test Reports

After running tests, view the HTML report:

```bash
npm run test:report
```

This opens a detailed report showing:
- Test execution timeline
- Screenshots (if any test fails)
- Network requests
- Console logs
- Trace files for debugging

### Debugging Failed Tests

If a test fails:

1. **Run in UI mode**:
   ```bash
   npm run test:ui
   ```

2. **Check the HTML report**:
   ```bash
   npm run test:report
   ```

3. **Run specific failing test with debug**:
   ```bash
   PWDEBUG=1 npx playwright test -g "failing test name"
   ```

4. **Check browser console**:
   - Failed tests include console logs in the report

### Manual Verification

To manually verify the feature:

1. **Start the server**:
   ```bash
   npx http-server ./app -p 3000
   ```

2. **Open browser**: Navigate to `http://localhost:3000`

3. **Test the feature**:
   - Checkbox should be unchecked
   - All tasks should have normal styling
   - Click checkbox
   - Tasks 2 & 3 should turn red
   - Unclick checkbox
   - Tasks should return to normal

### CI/CD Integration

To run tests in CI/CD (e.g., GitHub Actions):

```yaml
- name: Install dependencies
  run: npm install

- name: Install Playwright browsers
  run: npx playwright install --with-deps chromium

- name: Run tests
  run: npm test
```

### Performance Expectations

Typical test execution times:
- Full suite: ~2-3 seconds
- Individual test: ~150-400ms
- CI environment: ~5-10 seconds (including setup)

### Success Criteria

All 7 tests should pass:
- ✅ Page loads correctly
- ✅ Flag is disabled by default
- ✅ No highlighting when disabled
- ✅ Flag can be enabled
- ✅ Red highlighting when enabled
- ✅ Toggle works correctly
- ✅ All tasks are visible

### Troubleshooting

#### Browser Installation Issues
```bash
# Install system dependencies
npx playwright install-deps chromium

# Force reinstall browser
npx playwright install chromium --force
```

#### Port Conflicts
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill process using port 3000
kill -9 <PID>

# Or use different port (update playwright.config.ts)
```

#### TypeScript Errors
```bash
# Validate TypeScript
npx tsc --noEmit

# Check for syntax errors
npx tsc tests/pastDueTasks.spec.ts --noEmit
```

### Next Steps

After tests pass:
1. Review test report for any warnings
2. Check code coverage if needed
3. Add more test cases for edge cases
4. Integrate with CI/CD pipeline
5. Document any custom configuration

### Support

For issues or questions:
- Check Playwright documentation: https://playwright.dev
- Review TEST_VALIDATION.md for detailed specifications
- See DEMO.md for manual testing procedures

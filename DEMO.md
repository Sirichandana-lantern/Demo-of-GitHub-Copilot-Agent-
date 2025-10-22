# CareHub Past Due Tasks Feature Demo

## Quick Start Guide

This guide will help you run and test the CareHub Past Due Tasks feature.

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Demo-of-GitHub-Copilot-Agent-
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install chromium
   ```

### Running the Application

Start the development server:
```bash
npx http-server ./app -p 3000
```

Open your browser and navigate to: `http://localhost:3000`

### Manual Testing

1. **Verify Default State:**
   - The "Enable Past Due Tasks Highlighting" checkbox should be **unchecked**
   - All 4 tasks should be visible with normal styling
   - No red highlighting on any tasks

2. **Enable the Feature:**
   - Click the checkbox to enable the feature
   - **Tasks 2 and 3** should immediately turn red (these are past due)
   - **Tasks 1 and 4** should remain with normal styling (these are future tasks)

3. **Verify Red Highlighting:**
   - Past due tasks should have:
     - Light red background (#ffebee)
     - Red border (#ef5350)
     - Dark red title text (#c62828)
     - Bold red due date text (#d32f2f)

4. **Toggle the Feature:**
   - Uncheck the checkbox
   - All tasks should return to normal styling
   - Check the checkbox again
   - Past due tasks should turn red again

### Running Automated Tests

Run all Playwright tests:
```bash
npm test
```

Run tests in UI mode (interactive):
```bash
npm run test:ui
```

Run tests with browser visible:
```bash
npm run test:headed
```

View test report:
```bash
npm run test:report
```

### Test Cases Covered

1. ✅ Page loads correctly
2. ✅ Feature flag is disabled by default
3. ✅ Past due tasks are NOT highlighted when flag is disabled
4. ✅ Feature flag can be enabled via checkbox
5. ✅ Past due tasks ARE highlighted in red when flag is enabled
6. ✅ Feature can be toggled on and off
7. ✅ All tasks are visible and display correct information

### Expected Test Results

All 7 tests should pass:
- ✓ should load the CareHub landing page
- ✓ feature flag should be disabled by default
- ✓ past due tasks should NOT be highlighted when flag is disabled
- ✓ should enable the feature flag when checkbox is checked
- ✓ past due tasks SHOULD be highlighted in red when flag is enabled
- ✓ should toggle highlighting when flag is enabled then disabled
- ✓ all tasks should be visible on the page

### Troubleshooting

**Issue: Browser not installed**
```bash
npx playwright install chromium
```

**Issue: Port 3000 already in use**
```bash
# Use a different port
npx http-server ./app -p 3001
```
Then update `playwright.config.ts` to use the new port.

**Issue: Tests fail to connect to server**
- Make sure the server is running before tests start
- The Playwright config has a `webServer` option that automatically starts it

### Screenshots

When you enable the feature flag, you should see:

**Before (Flag Disabled):**
- All tasks with white background
- Black text
- Normal styling

**After (Flag Enabled):**
- Tasks 2 & 3 with light red background
- Tasks 2 & 3 with red text and bold due dates
- Tasks 1 & 4 remain unchanged

### Architecture

```
┌─────────────────────────────────────┐
│   CareHub Landing Page (HTML)      │
│   - Task List Display               │
│   - Feature Flag Checkbox           │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│   Feature Flag Configuration (JS)   │
│   - pastDueTasks: false (default)   │
│   - getFeatureFlag()                │
│   - setFeatureFlag()                │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│   Playwright Test Suite (TS)        │
│   - 7 comprehensive test cases      │
│   - Validates flag behavior          │
│   - Verifies red highlighting        │
└─────────────────────────────────────┘
```

### Contact & Support

For issues or questions, please open an issue in the repository.

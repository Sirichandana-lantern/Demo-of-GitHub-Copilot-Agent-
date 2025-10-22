import { test, expect } from '@playwright/test';

test.describe('CareHub Past Due Tasks Feature Flag', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the CareHub landing page before each test
    await page.goto('/');
  });

  test('should load the CareHub landing page', async ({ page }) => {
    // Verify the page title
    await expect(page).toHaveTitle('CareHub - Task Management');
    
    // Verify header is present
    const header = page.locator('h1');
    await expect(header).toHaveText('CareHub Task Management');
  });

  test('feature flag should be disabled by default', async ({ page }) => {
    // Verify the checkbox exists
    const flagCheckbox = page.getByTestId('past-due-tasks-flag');
    await expect(flagCheckbox).toBeVisible();
    
    // Verify the checkbox is unchecked by default
    await expect(flagCheckbox).not.toBeChecked();
  });

  test('past due tasks should NOT be highlighted when flag is disabled', async ({ page }) => {
    // Verify the feature flag is disabled
    const flagCheckbox = page.getByTestId('past-due-tasks-flag');
    await expect(flagCheckbox).not.toBeChecked();
    
    // Get past due task elements (tasks 2 and 3 are past due)
    const task2 = page.getByTestId('task-2');
    const task3 = page.getByTestId('task-3');
    
    // Verify past due tasks do NOT have the 'past-due' class
    await expect(task2).not.toHaveClass(/past-due/);
    await expect(task3).not.toHaveClass(/past-due/);
    
    // Verify future tasks also don't have the 'past-due' class
    const task1 = page.getByTestId('task-1');
    const task4 = page.getByTestId('task-4');
    await expect(task1).not.toHaveClass(/past-due/);
    await expect(task4).not.toHaveClass(/past-due/);
  });

  test('should enable the feature flag when checkbox is checked', async ({ page }) => {
    // Get the feature flag checkbox
    const flagCheckbox = page.getByTestId('past-due-tasks-flag');
    
    // Click to enable the feature flag
    await flagCheckbox.click();
    
    // Verify the checkbox is now checked
    await expect(flagCheckbox).toBeChecked();
  });

  test('past due tasks SHOULD be highlighted in red when flag is enabled', async ({ page }) => {
    // Get the feature flag checkbox
    const flagCheckbox = page.getByTestId('past-due-tasks-flag');
    
    // Enable the feature flag
    await flagCheckbox.click();
    await expect(flagCheckbox).toBeChecked();
    
    // Get task elements
    const task1 = page.getByTestId('task-1'); // Future task
    const task2 = page.getByTestId('task-2'); // Past due task
    const task3 = page.getByTestId('task-3'); // Past due task
    const task4 = page.getByTestId('task-4'); // Future task
    
    // Verify past due tasks have the 'past-due' class
    await expect(task2).toHaveClass(/past-due/);
    await expect(task3).toHaveClass(/past-due/);
    
    // Verify future tasks do NOT have the 'past-due' class
    await expect(task1).not.toHaveClass(/past-due/);
    await expect(task4).not.toHaveClass(/past-due/);
    
    // Verify the background color is red for past due tasks
    const task2BgColor = await task2.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    const task3BgColor = await task3.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    // RGB for #ffebee (light red background)
    expect(task2BgColor).toBe('rgb(255, 235, 238)');
    expect(task3BgColor).toBe('rgb(255, 235, 238)');
    
    // Verify the title color is dark red for past due tasks
    const task2TitleColor = await task2.locator('.task-title').evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    const task3TitleColor = await task3.locator('.task-title').evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    
    // RGB for #c62828 (dark red text)
    expect(task2TitleColor).toBe('rgb(198, 40, 40)');
    expect(task3TitleColor).toBe('rgb(198, 40, 40)');
  });

  test('should toggle highlighting when flag is enabled then disabled', async ({ page }) => {
    const flagCheckbox = page.getByTestId('past-due-tasks-flag');
    const task2 = page.getByTestId('task-2');
    const task3 = page.getByTestId('task-3');
    
    // Initially, flag is disabled and tasks are not highlighted
    await expect(flagCheckbox).not.toBeChecked();
    await expect(task2).not.toHaveClass(/past-due/);
    await expect(task3).not.toHaveClass(/past-due/);
    
    // Enable the flag
    await flagCheckbox.click();
    await expect(flagCheckbox).toBeChecked();
    
    // Tasks should now be highlighted
    await expect(task2).toHaveClass(/past-due/);
    await expect(task3).toHaveClass(/past-due/);
    
    // Disable the flag again
    await flagCheckbox.click();
    await expect(flagCheckbox).not.toBeChecked();
    
    // Tasks should no longer be highlighted
    await expect(task2).not.toHaveClass(/past-due/);
    await expect(task3).not.toHaveClass(/past-due/);
  });
  
  test('all tasks should be visible on the page', async ({ page }) => {
    // Verify all four tasks are visible
    const task1 = page.getByTestId('task-1');
    const task2 = page.getByTestId('task-2');
    const task3 = page.getByTestId('task-3');
    const task4 = page.getByTestId('task-4');
    
    await expect(task1).toBeVisible();
    await expect(task2).toBeVisible();
    await expect(task3).toBeVisible();
    await expect(task4).toBeVisible();
    
    // Verify task titles
    await expect(task1).toContainText('Schedule Annual Checkup');
    await expect(task2).toContainText('Review Lab Results');
    await expect(task3).toContainText('Refill Prescription');
    await expect(task4).toContainText('Follow-up Appointment');
  });
});

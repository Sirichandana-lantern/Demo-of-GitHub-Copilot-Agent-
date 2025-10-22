import { test, expect } from '@playwright/test';
import { createUser } from '../src/api/userApi';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';

test.describe('User Login E2E Flow', () => {
  
  test('should create user via API and login via UI', async ({ page }) => {
    // Step 1: Create user via API (mock)
    const user = createUser();
    console.log(`Created user: ${user.name} (${user.email})`);
    
    // Verify user object has required properties
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('name');
    expect(user.email).toContain('@');
    expect(user.password).toBeTruthy();
    expect(user.name).toBe('Test User');

    // Step 2: Navigate to login page
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Step 3: Login via UI
    await loginPage.login(user.email, user.password);

    // Step 4: Verify dashboard and user name
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.waitForDashboard();
    
    // Verify dashboard is visible
    const isDashboardVisible = await dashboardPage.isDashboardVisible();
    expect(isDashboardVisible).toBeTruthy();

    // Verify user name is displayed
    const displayedName = await dashboardPage.getUserName();
    expect(displayedName).toContain(user.name);
    
    console.log(`Successfully logged in and verified user: ${displayedName}`);
  });

  test('should verify API returns unique user emails', async () => {
    // Create multiple users to verify uniqueness
    const user1 = createUser();
    await new Promise(resolve => setTimeout(resolve, 10)); // Small delay
    const user2 = createUser();
    
    expect(user1.email).not.toBe(user2.email);
    expect(user1.name).toBe('Test User');
    expect(user2.name).toBe('Test User');
  });
});

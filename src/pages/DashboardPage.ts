import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for Dashboard Page
 */
export class DashboardPage {
  readonly page: Page;
  readonly welcomeMessage: Locator;
  readonly userNameDisplay: Locator;
  readonly logoutButton: Locator;
  readonly dashboardHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    // Using robust locators: getByRole, getByTestId, getByText
    this.dashboardHeading = page.getByRole('heading', { name: /dashboard/i });
    this.welcomeMessage = page.getByTestId('welcome-message');
    this.userNameDisplay = page.getByTestId('user-name');
    this.logoutButton = page.getByRole('button', { name: /log out|logout|sign out/i });
  }

  /**
   * Wait for dashboard to be loaded
   */
  async waitForDashboard() {
    await this.dashboardHeading.waitFor({ state: 'visible' });
  }

  /**
   * Get the displayed user name
   */
  async getUserName(): Promise<string> {
    return await this.userNameDisplay.textContent() || '';
  }

  /**
   * Get the welcome message
   */
  async getWelcomeMessage(): Promise<string> {
    return await this.welcomeMessage.textContent() || '';
  }

  /**
   * Perform logout
   */
  async logout() {
    await this.logoutButton.click();
  }

  /**
   * Check if dashboard is visible
   */
  async isDashboardVisible(): Promise<boolean> {
    return await this.dashboardHeading.isVisible();
  }
}

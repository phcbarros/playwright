import type {Locator, Page} from "@playwright/test";

export class SettingsPage {
  private readonly button: Locator;
  constructor(public readonly page: Page) {
    this.button = this.page.getByLabel('Switch between dark and light');
  }

  async goto() {
    await this.page.goto('https://playwright.dev');
  }

  async switchToDarkMode() {
    await this.button.click();
  }
}
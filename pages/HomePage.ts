import { Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    const baseUrl = process.env.BASE_URL ?? 'https://playwright.dev';
    await this.page.goto(baseUrl);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}

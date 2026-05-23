import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import { CustomWorld } from '../utils/world';
import { HomePage } from '../pages/HomePage';

Given('I navigate to the application', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.goto();
});

Then('the page title should contain {string}', async function (
  this: CustomWorld,
  expectedTitle: string
) {
  const homePage = new HomePage(this.page);
  await expect(await homePage.getTitle()).toContain(expectedTitle);
});

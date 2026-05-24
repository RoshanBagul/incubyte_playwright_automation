import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CustomWorld } from '../utils/world';

Given('I am on the Customer Login page', async function () {
     const homePage = new HomePage(this.page);
      await homePage.goto();
          
      await expect(this.page.locator('h2')).toContainText('Customer Login');
 });
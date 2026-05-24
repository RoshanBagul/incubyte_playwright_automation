import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CustomWorld } from '../utils/world';
import { RegisterPage } from '../pages/registerPage';

Given('I am on the Customer Login page', async function () {
     const homePage = new HomePage(this.page);
     await homePage.goto();
          
     await expect(this.page.locator('h2')).toContainText('Customer Login');
});

 When('I click on the {string} link', async function (register_link) {
     await expect(this.page.locator('#loginPanel')).toContainText(register_link);
     await this.page.locator('#loginPanel').getByRole('link', { name: register_link }).click();
});


Then('Signing up is easy! section should be visible', async function () {
     await this.page.waitForTimeout(3000);
     await expect(this.page.locator('h1')).toContainText('Signing up is easy!');
     await expect(this.page.locator('form#customerForm')).toBeVisible();
});


When('I enter details in the form', async function (dataTable) {
     const data = dataTable.hashes()[0];
     const registerPage = new RegisterPage(this.page);
     await registerPage.fillRegistrationForm(data);
});

When('I click on Register button', async function () {
     await this.page.waitForTimeout(3000);
     console.log('Clicking on Register button');
     const registerPage = new RegisterPage(this.page);
     registerPage.submitRegistration();
});

Then('Validate that user should be logged in with mesage {string}', async function (message) {
     console.log('User should be logged in successfully');
     await this.page.waitForTimeout(3000);
     await expect(this.page.locator('#rightPanel')).toContainText(message); 
});

Then('Validate that {string} page should be visible', async function (pageTitle) {
     await expect(this.page.locator('h1').first()).toContainText(pageTitle);
});

When('I login with registered credentials', async function () {
     const registerPage = new RegisterPage(this.page);
     await registerPage.login();
});

Then('Validate that user should be logged-In', async function () {
     const registerPage = new RegisterPage(this.page);
     await this.page.waitForTimeout(3000);
     await expect(this.page.locator('#leftPanel')).toContainText(`Welcome ${registerPage.registeredUsername}`);
});

Then('I fetch the Total Amount displayed on the page and print it in console', async function () {
     await this.page.waitForTimeout(3000);
     const BalanceAmount = await this.page.locator('#accountTable tbody tr:nth-child(1) td:nth-child(2)').textContent();
     const AvailableAmount = await this.page.locator('#accountTable tbody tr:nth-child(1) td:nth-child(3)').textContent();
     const totalAmount = await this.page.locator('#accountTable tbody tr:nth-child(2) td:nth-child(2)').textContent();
     
     console.log('Balance Amount:', BalanceAmount?.trim());
     console.log('Available Amount:', AvailableAmount?.trim());
     console.log('Total Amount:', totalAmount?.trim());
});

When('I click on {string} link', async function (logout_link) {
     await this.page.locator('#leftPanel').getByRole('link', { name: logout_link }).click();
});
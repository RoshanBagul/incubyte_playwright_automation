import { Page, expect } from '@playwright/test';
import { randomUUID } from "crypto";

export class RegisterPage {

  public registeredFirstname!: string;
  public registeredUsername!: string;
  public registeredPassword!: string;
  constructor(private readonly page: Page) {
    this.page = page;
  }

  async fillRegistrationForm(data: Record<string, string>): Promise<{firstname: string, username: string, password: string}> {

    const uniqueUserName = `pw_${randomUUID().slice(0, 8)}`;
    const uniqueFirstName = `${data['First Name']}_${Date.now()}`;

    this.registeredFirstname = uniqueFirstName; // Store the registered first name for later use

    await this.page.fill('#customerForm input[name="customer.firstName"]', uniqueFirstName);
    await this.page.fill('#customerForm input[name="customer.lastName"]', data['Last Name']);
    await this.page.fill('#customerForm input[name="customer.address.street"]', data['Address']);
    await this.page.fill('#customerForm input[name="customer.address.city"]', data['City']);
    await this.page.fill('#customerForm input[name="customer.address.state"]', data['State']);
    await this.page.fill('#customerForm input[name="customer.address.zipCode"]', data['Zip Code']);
    await this.page.fill('#customerForm input[name="customer.phoneNumber"]', data['Phone']);
    await this.page.fill('#customerForm input[name="customer.ssn"]', data['SSN']);

    const usernameField = this.page.locator('#customerForm input[name="customer.username"]');
    await usernameField.click();
    await usernameField.clear();
    await usernameField.pressSequentially(uniqueUserName, { delay: 100 }); // writing username with delay to mimic real user behavior
    await this.page.waitForTimeout(500);
    
    await this.page.fill('#customerForm input[name="customer.password"]', data['Password']);
    await this.page.fill('#customerForm input[name="repeatedPassword"]', data['Confirm']);

    return { firstname: uniqueFirstName, username: uniqueUserName, password: data['Password'] };
    
  }

  async submitRegistration(): Promise<void> {
    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      this.page.locator('input[value="Register"]').click()
    ]);
  }

  async login( username: string, password: string): Promise<void> {
    const usernameField = this.page.locator('input[name=username]');
    await usernameField.click();
    await usernameField.clear();
    await usernameField.pressSequentially(username, { delay: 100 }); // writing username with delay to mimic real user behavior
    // await this.page.fill('input[name=username]', username); --- commented out to use pressSequentially for better mimic of real user behavior in orfer to avoid flaky test results
    const passwordField = this.page.locator('input[name=password]');
    await passwordField.click();
    await passwordField.clear();
    await passwordField.pressSequentially(password, { delay: 100 }); // writing password with delay to mimic real user behavior
    // await this.page.fill('input[name=password]', password); 
    await this.page.getByRole('button', { name: 'Log In' }).click();
  }
}

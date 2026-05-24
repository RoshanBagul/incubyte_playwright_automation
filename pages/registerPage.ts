import { Page, expect } from '@playwright/test';

export class RegisterPage {

  public registeredUsername!: string;
  public registeredPassword!: string;
  constructor(private readonly page: Page) {
    this.page = page;
  }

  async fillRegistrationForm(data: Record<string, string>): Promise<void> {

    const uniqueUserName = `${data['Username']}_${Date.now()}`;
    const uniqueFirstName = `${data['First Name']}_${Date.now()}`;

    await this.page.fill('#customerForm input[name="customer.firstName"]', uniqueFirstName);
    await this.page.fill('#customerForm input[name="customer.lastName"]', data['Last Name']);
    await this.page.fill('#customerForm input[name="customer.address.street"]', data['Address']);
    await this.page.fill('#customerForm input[name="customer.address.city"]', data['City']);
    await this.page.fill('#customerForm input[name="customer.address.state"]', data['State']);
    await this.page.fill('#customerForm input[name="customer.address.zipCode"]', data['Zip Code']);
    await this.page.fill('#customerForm input[name="customer.phoneNumber"]', data['Phone']);
    await this.page.fill('#customerForm input[name="customer.ssn"]', data['SSN']);
    await this.page.fill('#customerForm input[name="customer.username"]', uniqueUserName);
    await this.page.fill('#customerForm input[name="customer.password"]', data['Password']);
    await this.page.fill('#customerForm input[name="repeatedPassword"]', data['Confirm']);

    this.registeredUsername = uniqueUserName;
    this.registeredPassword = data['Password'];
    
  }

  async submitRegistration(): Promise<void> {
    await this.page.getByRole('button', { name: 'Register' }).click();
  }

  async login(): Promise<void> {
    await this.page.fill('input[name=username]', this.registeredUsername);
    await this.page.fill('input[name=password]', this.registeredPassword);
    await this.page.getByRole('button', { name: 'Log In' }).click();
  }
}
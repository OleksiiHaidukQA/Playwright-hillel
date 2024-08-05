import { expect } from '@playwright/test';

export class RegistrationPopup {
  constructor(page) {
    this.page = page;
    this.locators = {
      registrationButton: 'button:has-text("Sign up")',
      name: '#signupName',
      lastName: '#signupLastName',
      email: '#signupEmail',
      password: '#signupPassword',
      repeatPassword: '#signupRepeatPassword',
      submitButton: 'button.btn-primary:has-text("Register")',
      invalidFeedback: '.invalid-feedback',
      invalidFeedbackP: '.invalid-feedback p'
    };
  }

  async clickRegistrationButton() {
    await this.page.click(this.locators.registrationButton);
  }

  async fillName(name) {
    await this.page.fill(this.locators.name, name);
  }

  async fillLastName(lastName) {
    await this.page.fill(this.locators.lastName, lastName);
  }

  async fillEmail(email) {
    await this.page.fill(this.locators.email, email);
  }

  async fillPassword(password) {
    await this.page.fill(this.locators.password, password);
  }

  async fillRepeatPassword(repeatPassword) {
    await this.page.fill(this.locators.repeatPassword, repeatPassword);
  }

  async clickSubmit() {
    await this.page.click(this.locators.submitButton);
  }

  async expectInvalidFeedback(text) {
    await expect(this.page.locator(this.locators.invalidFeedback)).toContainText(text);
  }

  async expectInvalidFeedbackP(text) {
    await expect(this.page.locator(this.locators.invalidFeedbackP)).toContainText(text);
  }

  async blurField(selector) {
    await this.page.locator(selector).blur();
  }
}
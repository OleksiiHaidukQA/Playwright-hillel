import { expect } from '@playwright/test';

export class RegistrationPopup {
    constructor(page) {
      this.page = page;
      this.registrationButton = 'button:has-text("Sign up")';
      this.name = '#signupName';
      this.lastName = '#signupLastName';
      this.email = '#signupEmail';
      this.password = '#signupPassword';
      this.repeatPassword = '#signupRepeatPassword';
      this.submitButton = 'button.btn-primary:has-text("Register")';
      this.invalidFeedback = '.invalid-feedback';
      this.invalidFeedbackP = '.invalid-feedback p';
    }
  
    async clickRegistrationButton() {
      await this.page.click(this.registrationButton);
    }
  
    async fillName(name) {
      await this.page.fill(this.name, name);
    }
  
    async fillLastName(lastName) {
      await this.page.fill(this.lastName, lastName);
    }
  
    async fillEmail(email) {
      await this.page.fill(this.email, email);
    }
  
    async fillPassword(password) {
      await this.page.fill(this.password, password);
    }
  
    async fillRepeatPassword(repeatPassword) {
      await this.page.fill(this.repeatPassword, repeatPassword);
    }
  
    async clickSubmit() {
      await this.page.click(this.submitButton);
    }
  
    async expectInvalidFeedback(text) {
      await expect(this.page.locator(this.invalidFeedback)).toContainText(text);
    }
  
    async expectInvalidFeedbackP(text) {
      await expect(this.page.locator(this.invalidFeedbackP)).toContainText(text);
    }
  }
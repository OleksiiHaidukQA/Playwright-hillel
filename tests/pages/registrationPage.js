// tests/pages/registrationPage.js
import { BasePage } from './basePage';
import { RegistrationPopup } from './registrationPopup';

export class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    this.registrationPopup = new RegistrationPopup(page);
  }

  async blurField(selector) {
    await this.page.locator(selector).blur();
  }
}
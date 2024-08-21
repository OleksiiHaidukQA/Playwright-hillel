import  BasePage  from './BasePage';
import { RegistrationPopup } from './RegistrationPopup';

export class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    this.registrationPopup = new RegistrationPopup(page);
  }
}
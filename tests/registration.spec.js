// tests/registration.spec.js
import { test, expect } from '@playwright/test';
import { RegistrationPage } from './pages/registrationPage';
import { errors } from './common/errors';
import { GenerateChars } from './utils/GeneratingChars';

test.describe('registration flow', () => {
  const generateChars = new GenerateChars();
  
  test.beforeEach(async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigate();
    await registrationPage.registrationPopup.clickRegistrationButton();
  });

  test('registration process', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const nameLength = 10;
    const nameMock = generateChars.getRandomName(nameLength);
    const emailMock = generateChars.getRandomEmail(nameLength);
    const passwordMock = generateChars.getRandomPassword(nameLength);

    await registrationPage.registrationPopup.fillName(nameMock);
    await registrationPage.registrationPopup.fillLastName(nameMock);
    await registrationPage.registrationPopup.fillEmail(emailMock);
    await registrationPage.registrationPopup.fillPassword(passwordMock);
    await registrationPage.registrationPopup.fillRepeatPassword(passwordMock);
    await registrationPage.registrationPopup.clickSubmit();
    
    await registrationPage.expectURL('/panel/garage');
  });

  test('error while checking name', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.registrationPopup.fillName('1');
    await registrationPage.registrationPopup.fillLastName(' ');
    await registrationPage.registrationPopup.expectInvalidFeedback(errors.invalidName);
    await registrationPage.registrationPopup.expectInvalidFeedback(errors.nameLength);
    await registrationPage.expectElementToHaveCSS(registrationPage.registrationPopup.name, 'border-color', 'rgb(220, 53, 69)');
  });

  test('error while checking last name', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.registrationPopup.fillLastName('1');
    await registrationPage.registrationPopup.fillName(' ');
    await registrationPage.registrationPopup.expectInvalidFeedback(errors.lastNameInvalid);
    await registrationPage.expectElementToHaveCSS(registrationPage.registrationPopup.lastName, 'border-color', 'rgb(220, 53, 69)');
  });

  test('error while name is empty', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.registrationPopup.fillName(' ');
    await registrationPage.registrationPopup.fillLastName(' ');
    await registrationPage.registrationPopup.expectInvalidFeedback(errors.invalidName);
    await registrationPage.expectElementToHaveCSS(registrationPage.registrationPopup.name, 'border-color', 'rgb(220, 53, 69)');
  });

  test('error while last name is empty', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.registrationPopup.fillLastName(' ');
    await registrationPage.registrationPopup.fillName(' ');
    await registrationPage.registrationPopup.expectInvalidFeedback(errors.lastNameInvalid);
    await registrationPage.expectElementToHaveCSS(registrationPage.registrationPopup.lastName, 'border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(registrationPage.registrationPopup.submitButton)).toBeDisabled();
  });

  test('error while email is invalid', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const nameLength = 10;
    const nameMock = generateChars.getRandomName(nameLength);
    const invalidEmail = 'invalidEmail';
    const passwordMock = generateChars.getRandomPassword(nameLength);

    await registrationPage.registrationPopup.fillName(nameMock);
    await registrationPage.registrationPopup.fillLastName(nameMock);
    await registrationPage.registrationPopup.fillEmail(invalidEmail);
    await registrationPage.registrationPopup.fillPassword(passwordMock);
    await registrationPage.registrationPopup.expectInvalidFeedback(errors.emailIsIncorrect);
    await registrationPage.expectElementToHaveCSS(registrationPage.registrationPopup.email, 'border-color', 'rgb(220, 53, 69)');
  });

  test('error while email is empty', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.registrationPopup.fillEmail(' ');
    await registrationPage.registrationPopup.fillPassword(' ');
    await registrationPage.registrationPopup.expectInvalidFeedback(errors.emailIsIncorrect);
    await registrationPage.expectElementToHaveCSS(registrationPage.registrationPopup.email, 'border-color', 'rgb(220, 53, 69)');
  });

  test('error while password is invalid', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const nameLength = 10;
    const nameMock = generateChars.getRandomName(nameLength);
    const emailMock = generateChars.getRandomEmail(nameLength);
    const invalidPassword = 'short1';

    await registrationPage.registrationPopup.fillName(nameMock);
    await registrationPage.registrationPopup.fillLastName(nameMock);
    await registrationPage.registrationPopup.fillEmail(emailMock);
    await registrationPage.registrationPopup.fillPassword(invalidPassword);
    await registrationPage.registrationPopup.fillRepeatPassword(invalidPassword);
    await registrationPage.registrationPopup.expectInvalidFeedbackP(errors.passwordInvalid);
    await registrationPage.expectElementToHaveCSS(registrationPage.registrationPopup.password, 'border-color', 'rgb(220, 53, 69)');
  });

  test('error while password is empty', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.registrationPopup.fillPassword('');
    await registrationPage.registrationPopup.fillRepeatPassword('');
    await registrationPage.registrationPopup.expectInvalidFeedbackP(errors.passwordRequired);
    await registrationPage.expectElementToHaveCSS(registrationPage.registrationPopup.password, 'border-color', 'rgb(220, 53, 69)');
  });

  test('error while passwords do not match', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const nameLength = 10;
    const nameMock = generateChars.getRandomName(nameLength);
    const emailMock = generateChars.getRandomEmail(nameLength);
    const passwordMock = generateChars.getRandomPassword(nameLength);
    const invalidPassword = 'DifferentPas1!';

    await registrationPage.registrationPopup.fillName(nameMock);
    await registrationPage.registrationPopup.fillLastName(nameMock);
    await registrationPage.registrationPopup.fillEmail(emailMock);
    await registrationPage.registrationPopup.fillPassword(passwordMock);
    await registrationPage.registrationPopup.fillRepeatPassword(invalidPassword);
    await registrationPage.blurField(registrationPage.registrationPopup.repeatPassword); 
    await registrationPage.registrationPopup.expectInvalidFeedbackP(errors.passwordDoNotMatch);
    await registrationPage.expectElementToHaveCSS(registrationPage.registrationPopup.repeatPassword, 'border-color', 'rgb(220, 53, 69)');
  });

  test('error while re-enter password is empty', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const nameLength = 10;
    const nameMock = generateChars.getRandomName(nameLength);
    const emailMock = generateChars.getRandomEmail(nameLength);
    const passwordMock = generateChars.getRandomPassword(nameLength);

    await registrationPage.registrationPopup.fillName(nameMock);
    await registrationPage.registrationPopup.fillLastName(nameMock);
    await registrationPage.registrationPopup.fillEmail(emailMock);
    await registrationPage.registrationPopup.fillPassword(passwordMock);
    await registrationPage.registrationPopup.fillRepeatPassword('');
    await registrationPage.blurField(registrationPage.registrationPopup.repeatPassword);
    await registrationPage.registrationPopup.expectInvalidFeedbackP(errors.passwordMatchRequired);
  });
});
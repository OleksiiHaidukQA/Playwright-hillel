import { test, expect } from '@playwright/test';
import { RegistrationPage } from './pages/registrationPage';
import { errors } from './common/errors';
import { GenerateChars } from './utils/GeneratingChars';

test.describe('registration flow', () => {
  const generateChars = new GenerateChars();
  
  test.beforeEach(async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigate();
    await registrationPage.clickRegistrationButton();
  });

  test('registration process', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const nameLength = 10;
    const nameMock = generateChars.getRandomName(nameLength);
    const emailMock = generateChars.getRandomEmail(nameLength);
    const passwordMock = generateChars.getRandomPassword(nameLength);

    await registrationPage.fillName(nameMock);
    await registrationPage.fillLastName(nameMock);
    await registrationPage.fillEmail(emailMock);
    await registrationPage.fillPassword(passwordMock);
    await registrationPage.fillRepeatPassword(passwordMock);
    await registrationPage.clickSubmit();
    
    await registrationPage.expectURL('/panel/garage');
  });

  test('error while checking name', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.fillName('1');
    await registrationPage.fillLastName(' ');
    await registrationPage.expectInvalidFeedback(errors.invalidName);
    await registrationPage.expectInvalidFeedback(errors.nameLength);
    await registrationPage.expectElementToHaveCSS(registrationPage.name, 'border-color', 'rgb(220, 53, 69)');
  });

  test('error while checking last name', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.fillLastName('1');
    await registrationPage.fillName(' ');
    await registrationPage.expectInvalidFeedback(errors.lastNameInvalid);
    await registrationPage.expectElementToHaveCSS(registrationPage.lastName, 'border-color', 'rgb(220, 53, 69)');
  });

  test('error while name is empty', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.fillName(' ');
    await registrationPage.fillLastName(' ');
    await registrationPage.expectTextToBeVisible(errors.invalidName);
    await registrationPage.expectElementToHaveCSS(registrationPage.name, 'border-color', 'rgb(220, 53, 69)');
  });

  test('error while last name is empty', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.fillLastName(' ');
    await registrationPage.fillName(' ');
    await registrationPage.expectTextToBeVisible(errors.lastNameInvalid);
    await registrationPage.expectElementToHaveCSS(registrationPage.lastName, 'border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(registrationPage.submitButton)).toBeDisabled();
  });

  test('error while email is invalid', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const nameLength = 10;
    const nameMock = generateChars.getRandomName(nameLength);
    const invalidEmail = 'invalidEmail';
    const passwordMock = generateChars.getRandomPassword(nameLength);

    await registrationPage.fillName(nameMock);
    await registrationPage.fillLastName(nameMock);
    await registrationPage.fillEmail(invalidEmail);
    await registrationPage.fillPassword(passwordMock);
    await registrationPage.expectTextToBeVisible(errors.emailIsIncorrect);
    await registrationPage.expectElementToHaveCSS(registrationPage.email, 'border-color', 'rgb(220, 53, 69)');
  });

  test('error while email is empty', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.fillEmail(' ');
    await registrationPage.fillPassword(' ');
    await registrationPage.expectTextToBeVisible(errors.emailIsIncorrect);
    await registrationPage.expectElementToHaveCSS(registrationPage.email, 'border-color', 'rgb(220, 53, 69)');
  });

  test('error while password is invalid', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const nameLength = 10;
    const nameMock = generateChars.getRandomName(nameLength);
    const emailMock = generateChars.getRandomEmail(nameLength);
    const invalidPassword = 'short1';

    await registrationPage.fillName(nameMock);
    await registrationPage.fillLastName(nameMock);
    await registrationPage.fillEmail(emailMock);
    await registrationPage.fillPassword(invalidPassword);
    await registrationPage.fillRepeatPassword(invalidPassword);
    await registrationPage.expectInvalidFeedbackP(errors.passwordInvalid);
    await registrationPage.expectElementToHaveCSS(registrationPage.password, 'border-color', 'rgb(220, 53, 69)');
  });

  test('error while password is empty', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.fillPassword('');
    await registrationPage.fillRepeatPassword('');
    await registrationPage.expectInvalidFeedbackP(errors.passwordRequired);
    await registrationPage.expectElementToHaveCSS(registrationPage.password, 'border-color', 'rgb(220, 53, 69)');
  });

  test('error while passwords do not match', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const nameLength = 10;
    const nameMock = generateChars.getRandomName(nameLength);
    const emailMock = generateChars.getRandomEmail(nameLength);
    const passwordMock = generateChars.getRandomPassword(nameLength);
    const invalidPassword = 'DifferentPas1!';

    await registrationPage.fillName(nameMock);
    await registrationPage.fillLastName(nameMock);
    await registrationPage.fillEmail(emailMock);
    await registrationPage.fillPassword(passwordMock);
    await registrationPage.fillRepeatPassword(invalidPassword);
    await registrationPage.blurField(registrationPage.repeatPassword); 
    await registrationPage.expectInvalidFeedbackP(errors.passwordDoNotMatch);
    await registrationPage.expectElementToHaveCSS(registrationPage.repeatPassword, 'border-color', 'rgb(220, 53, 69)');
  });

  test('error while re-enter password is empty', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const nameLength = 10;
    const nameMock = generateChars.getRandomName(nameLength);
    const emailMock = generateChars.getRandomEmail(nameLength);
    const passwordMock = generateChars.getRandomPassword(nameLength);

    await registrationPage.fillName(nameMock);
    await registrationPage.fillLastName(nameMock);
    await registrationPage.fillEmail(emailMock);
    await registrationPage.fillPassword(passwordMock);
    await registrationPage.fillRepeatPassword('');
    await registrationPage.blurField(registrationPage.repeatPassword);
    await registrationPage.expectInvalidFeedbackP(errors.passwordMatchRequired);
  });
});
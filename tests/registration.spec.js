import { test, expect } from '@playwright/test';
import { registrationSelectors } from './entities/registrationSelectors';
import { errors } from './common/errors';
import { GenerateChars } from './utils/generatingChars';

test.describe('registration flow', () => {
  const generateChars = new GenerateChars();
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click(registrationSelectors.registrationButton);
  });

  test('registration process', async ({ page }) => {
    const nameLength = 10;
    const nameMock = generateChars.getRandomName(nameLength);
    const emailMock = generateChars.getRandomEmail(nameLength);
    const passwordMock = generateChars.getRandomPassword(nameLength);

    await page.fill(registrationSelectors.name, nameMock);
    await page.fill(registrationSelectors.lastName, nameMock);
    await page.fill(registrationSelectors.email, emailMock);
    await page.fill(registrationSelectors.password, passwordMock);
    await page.fill(registrationSelectors.repeatPassword, passwordMock);
    await page.click(registrationSelectors.submit);
    
    await expect(page).toHaveURL('/panel/garage');
  });

  test('error while checking name', async ({ page }) => {
    await page.fill(registrationSelectors.name, '1');
    await page.focus(registrationSelectors.lastName);
    await expect(page.locator(registrationSelectors.invalidFeedback)).toContainText(errors.invalidName);
    await expect(page.locator(registrationSelectors.invalidFeedback)).toContainText(errors.nameLength);
  });

  test('error while checking last name', async ({ page }) => {
    await page.fill(registrationSelectors.lastName, '1');
    await page.focus(registrationSelectors.name);
    await expect(page.locator(registrationSelectors.invalidFeedback)).toContainText(errors.lastNameInvalid);
  });

  test('error while name is empty', async ({ page }) => {
    await page.focus(registrationSelectors.name);
    await page.focus(registrationSelectors.lastName);
    await expect(page.getByText('Name required')).toBeVisible();
  });

  test('error while last name is empty', async ({ page }) => {
    await page.focus(registrationSelectors.lastName);
    await page.focus(registrationSelectors.name);
    await expect(page.getByText('Last name required')).toBeVisible();
    await expect(page.locator(registrationSelectors.submit)).toBeDisabled();
  });

  test('error while email is invalid', async ({ page }) => {
    const nameLength = 10;
    const nameMock = generateChars.getRandomName(nameLength);
    const invalidEmail = 'invalidEmail';
    const passwordMock = generateChars.getRandomPassword(nameLength);

    await page.fill(registrationSelectors.name, nameMock);
    await page.fill(registrationSelectors.lastName, nameMock);
    await page.fill(registrationSelectors.email, invalidEmail);
    await expect(page.getByText('Email is incorrect')).toBeVisible;
  });

  test('error while email is empty', async ({ page }) => {
    await page.focus(registrationSelectors.email);
    await page.focus(registrationSelectors.password);
    await expect(page.getByText('Email is incorrect')).toBeVisible;
  });

  test('error while password is invalid', async ({ page }) => {
    const nameLength = 10;
    const nameMock = generateChars.getRandomName(nameLength);
    const emailMock = generateChars.getRandomEmail(nameLength);
    const invalidPassword = 'short1';

    await page.fill(registrationSelectors.name, nameMock);
    await page.fill(registrationSelectors.lastName, nameMock);
    await page.fill(registrationSelectors.email, emailMock);
    await page.fill(registrationSelectors.password, invalidPassword);
    await page.fill(registrationSelectors.repeatPassword, invalidPassword);
    await expect(page.locator(registrationSelectors.submit)).toBeDisabled();
    
    await expect(page.locator(registrationSelectors.invalidFeedbackP)).toContainText(errors.passwordInvalid);
  });

  test('error while password is empty', async ({ page }) => {
    await page.focus(registrationSelectors.password);
    await page.focus(registrationSelectors.repeatPassword);
    await expect(page.locator(registrationSelectors.invalidFeedbackP)).toContainText(errors.passwordRequired);
});

  test('error while passwords do not match', async ({ page }) => {
    const nameLength = 10;
    const nameMock = generateChars.getRandomName(nameLength);
    const emailMock = generateChars.getRandomEmail(nameLength);
    const passwordMock = generateChars.getRandomPassword(nameLength);
    const invalidPassword = 'short1';

    await page.fill(registrationSelectors.name, nameMock);
    await page.fill(registrationSelectors.lastName, nameMock);
    await page.fill(registrationSelectors.email, emailMock);
    await page.fill(registrationSelectors.password, passwordMock);
    await page.fill(registrationSelectors.repeatPassword, invalidPassword);
    await expect(page.locator(registrationSelectors.invalidFeedbackP)).toContainText(errors.passwordDoNotMatch);
  });

  test('error while re-enter password is empty', async ({ page }) => {
    const nameLength = 10;
    const nameMock = generateChars.getRandomName(nameLength);
    const emailMock = generateChars.getRandomEmail(nameLength);
    const passwordMock = generateChars.getRandomPassword(nameLength);

    await page.fill(registrationSelectors.name, nameMock);
    await page.fill(registrationSelectors.lastName, nameMock);
    await page.fill(registrationSelectors.email, emailMock);
    await page.fill(registrationSelectors.password, passwordMock);
    await page.focus(registrationSelectors.repeatPassword);
    await page.locator(registrationSelectors.repeatPassword).blur();
    
    await expect(page.locator(registrationSelectors.invalidFeedbackP)).toContainText(errors.passwordMatchRequired);
  });
});
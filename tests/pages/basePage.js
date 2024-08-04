import { expect } from '@playwright/test';

export class BasePage {
    constructor(page) {
      this.page = page;
    }
  
    async navigate() {
      await this.page.goto('/');
    }
  
    async expectElementToHaveCSS(selector, property, value) {
      await expect(this.page.locator(selector)).toHaveCSS(property, value);
    }
  
    async expectURL(url) {
      await expect(this.page).toHaveURL(url);
    }
  }
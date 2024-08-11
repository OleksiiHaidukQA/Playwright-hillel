import BasePage from './BasePage';

export default class WelcomePage extends BasePage {
    constructor(page) {
        super(page, '/');
        this.signInButton = page.locator('button:has-text("Sign In")');
    }
    
    async navigate() {
        await this.page.goto(this.url);
    }

    async clickSignInButton() {
        await this.signInButton.click();
    }
}
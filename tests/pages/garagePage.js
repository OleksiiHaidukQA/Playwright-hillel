import BasePage from './BasePage';

export default class GaragePage extends BasePage {
    constructor(page) {
        super(page, '/panel/garage');
        this.addCarButton = page.locator('button:has-text("Add car")');
    }
    
    async navigate() {
        await this.page.goto(this.url);
    }
}
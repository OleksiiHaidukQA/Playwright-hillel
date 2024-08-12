class WelcomePage {
    constructor(page) {
        this.page = page;
        this.url = process.env.BASE_URL; 
    }

    async navigate() {
        await this.page.goto(this.url);
    }

    async clickSignInButton() {
        // Проверяем, находится ли пользователь на странице /panel/garage
        const currentUrl = await this.page.url();
        if (currentUrl.includes('/panel/garage')) {
            // Если да, пропускаем клик на "Sign In"
            return;
        }

        // Если нет, выполняем клик по кнопке "Sign In"
        await this.page.click('button:has-text("Sign In")');
    }
}

export default WelcomePage;
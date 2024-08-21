// tests/pages/loginPage.js
class LoginPage {
    constructor(page) {
      this.page = page;
    }
  
    async login(email, password) {
      await this.page.fill('input[formcontrolname="email"]', email);
      await this.page.fill('input[formcontrolname="password"]', password);
      await this.page.getByRole('button', { name: 'Login' }).click();
      await this.page.waitForURL('/panel/garage');
    }
  }
  
  export default LoginPage;
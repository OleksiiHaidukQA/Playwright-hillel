import ApiBase from './ApiBase';

export default class ExpensesApi extends ApiBase {
  async createExpense(expenseData) {
    return this.post('/api/expenses', expenseData);
  }
}
export default class ApiBase {
    constructor(apiContext) {
      this.apiContext = apiContext;
    }
  
    async get(url) {
      const response = await this.apiContext.get(url);
      return this.handleResponse(response);
    }
  
    async post(url, data) {
      const response = await this.apiContext.post(url, { data });
      return this.handleResponse(response);
    }
  
    async delete(url) {
      const response = await this.apiContext.delete(url);
      return this.handleResponse(response);
    }
  
    async handleResponse(response) {
      if (!response.ok()) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${errorText}`);
      }
      return response.json();
    }
  }
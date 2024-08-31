class CarsController {
    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    async createCar(carData) {
        const response = await this.apiContext.post('api/cars', { data: carData });
        return this.handleResponse(response);
    }

    async getCars() {
        const response = await this.apiContext.get('api/cars');
        return this.handleResponse(response);
    }

    async deleteCar(carId) {
        const response = await this.apiContext.delete(`api/cars/${carId}`);
        return this.handleResponse(response);
    }

    async updateCar(carId, updatedData) {
        const response = await this.apiContext.put(`api/cars/${carId}`, { data: updatedData });
        return this.handleResponse(response);
    }

    async getBrands() {
        const response = await this.apiContext.get('api/cars/brands');
        return this.handleResponse(response);
    }

    async getBrandById(brandId) {
        const response = await this.apiContext.get(`api/cars/brands/${brandId}`);
        return this.handleResponse(response);
    }

    async getModels() {
        const response = await this.apiContext.get('api/cars/models');
        return this.handleResponse(response);
    }

    async getModelById(modelId) {
        const response = await this.apiContext.get(`api/cars/models/${modelId}`);
        return this.handleResponse(response);
    }

    async handleResponse(response) {
        const responseText = await response.text();
        console.log('Response Text:', responseText);
        if (!response.ok()) {
            const errorText = response.statusText() || 'Unknown error';
            throw new Error(`API request failed: ${errorText}`);
        }
        try {
            return JSON.parse(responseText);
        } catch (error) {
            throw new Error(`Failed to parse JSON: ${error.message}`);
        }
    }
}

export default CarsController;
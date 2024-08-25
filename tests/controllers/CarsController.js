class CarsController {
    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    async getBrands() {
        const response = await this.apiContext.get('/cars/brands', {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return this.handleResponse(response);
    }

    async getBrandById(id) {
        const response = await this.apiContext.get(`/cars/brands/${id}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return this.handleResponse(response);
    }

    async getModels() {
        const response = await this.apiContext.get('/cars/models', {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return this.handleResponse(response);
    }

    async getModelById(id) {
        const response = await this.apiContext.get(`/cars/models/${id}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return this.handleResponse(response);
    }

    async getCars() {
        const response = await this.apiContext.get('/cars', {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return this.handleResponse(response);
    }

    async createCar(carData) {
        const response = await this.apiContext.post('/cars', {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            postData: JSON.stringify(carData)
        });
        return this.handleResponse(response);
    }

    async getCarById(id) {
        const response = await this.apiContext.get(`/cars/${id}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return this.handleResponse(response);
    }

    async updateCar(id, carData) {
        const response = await this.apiContext.put(`/cars/${id}`, {
            data: carData,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return this.handleResponse(response);
    }

    async deleteCar(id) {
        const response = await this.apiContext.delete(`/cars/${id}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return this.handleResponse(response);
    }

    handleResponse(response) {
        console.log(response); 
        if (!response.ok()) {
            const errorText = response.statusText || 'Unknown error'; 
            throw new Error(`API request failed: ${errorText}`);
        }
        return response.json();
    }
}

export default CarsController;
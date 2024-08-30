class CarsController {
    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    async getBrands() {
        const response = await this.apiContext.get('api/cars/brands', {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return this.handleResponse(response);
    }

    async getBrandById(id) {
        const response = await this.apiContext.get(`api/cars/brands/${id}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return this.handleResponse(response);
    }

    async getModels() {
        const response = await this.apiContext.get('api/cars/models', {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return this.handleResponse(response);
    }

    async getModelById(id) {
        const response = await this.apiContext.get(`api/cars/models/${id}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return this.handleResponse(response);
    }

    async getCars() {
        const response = await this.apiContext.get('api/cars', {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return this.handleResponse(response);
    }

    async createCar(carData) {
        const response = await this.apiContext.post('api/cars', {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: carData
        });
        return this.handleResponse(response);
    }

    async getCarById(id) {
        const response = await this.apiContext.get(`api/cars/${id}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return this.handleResponse(response);
    }

    async updateCar(id, carData) {
        const response = await this.apiContext.put(`api/cars/${id}`, {
            data: carData,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return this.handleResponse(response);
    }

    async deleteCar(id) {
        const response = await this.apiContext.delete(`api/cars/${id}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return this.handleResponse(response);
    }

    async handleResponse(response) {
        console.log(await response.json()); 
        if (!response.ok()) {
            const errorText = response.statusText() || 'Unknown error'; 
            throw new Error(`API request failed: ${errorText}`);
        }
        return response.json();
    }
}

export default CarsController;
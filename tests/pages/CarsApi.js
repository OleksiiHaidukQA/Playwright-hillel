import ApiBase from './ApiBase';

export default class CarsApi extends ApiBase {
  async createCar(carData) {
    return this.post('/api/cars', carData);
  }

  async deleteCar(carId) {
    return this.delete(`/api/cars/${carId}`);
  }

  async getAllBrands() {
    return this.get('/api/cars/brands');
  }

  async getModelsByBrand(brandId) {
    return this.get(`/api/cars/models?brandId=${brandId}`);
  }

  async getAllCars() {
    return this.get('/api/cars');
  }
}
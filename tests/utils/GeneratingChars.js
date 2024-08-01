import { faker } from '@faker-js/faker';

export class GenerateChars {
  getRandomName(length) {
    return faker.string.alpha(length);
  }

  getRandomEmail(length) {
    return `aqa-${faker.internet.email()}`;
  }

  getRandomPassword(length) {
    return faker.internet.password({ length, memorable: false, pattern: /[A-Za-z0-9]/, prefix: 'P@ssw0rd' });
  }
}
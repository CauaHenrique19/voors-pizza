export class PersonalizationNotFoundError extends Error {
  constructor() {
    super('Personalization Not Found');
    this.name = 'PersonalizationNotFoundError';
  }
}

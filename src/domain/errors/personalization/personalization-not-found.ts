export class PersonalizationNotFound extends Error {
  constructor() {
    super('Personalization Not Found');
    this.name = 'PersonalizationNotFound';
  }
}

export class PersonalizationsNotFoundError extends Error {
  constructor() {
    super('Personalizations Not Found');
    this.name = 'PersonalizationsNotFoundError';
  }
}

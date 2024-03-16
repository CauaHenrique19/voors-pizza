export class FlavourNotFoundError extends Error {
  constructor() {
    super('Flavour Not Found');
    this.name = 'FlavourNotFoundError';
  }
}

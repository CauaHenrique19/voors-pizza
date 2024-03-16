export class FlavoursNotFoundError extends Error {
  constructor() {
    super('Flavours Not Found');
    this.name = 'FlavoursNotFoundError';
  }
}

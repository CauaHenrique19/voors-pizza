export class SizesNotFoundError extends Error {
  constructor() {
    super('Sizes Not Found');
    this.name = 'SizesNotFoundError';
  }
}

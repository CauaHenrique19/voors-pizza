export class SizeNotFoundError extends Error {
  constructor() {
    super('Size Not Found');
    this.name = 'SizeNotFoundError';
  }
}

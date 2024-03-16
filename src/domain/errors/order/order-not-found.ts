export class OrderNotFoundError extends Error {
  constructor() {
    super('Order Not Found');
    this.name = 'OrderNotFoundError';
  }
}

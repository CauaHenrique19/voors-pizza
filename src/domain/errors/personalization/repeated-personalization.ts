export class RepeatedPersonalizationError extends Error {
  constructor() {
    super('Repeated Personalization');
    this.name = 'RepeatedPersonalizationError';
  }
}

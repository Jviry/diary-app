export class DomainError extends Error {
  isDomainError: boolean = true;

  constructor(message: string) {
    super(message);
    this.name = 'DomainError';
  }
}

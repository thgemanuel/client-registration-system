import { DomainException } from './domain.exception';

export class ClientEmailAlreadyExistsException extends DomainException {
  constructor() {
    super(['Este E-mail já está cadastrado']);
    this.name = ClientEmailAlreadyExistsException.name;
  }
}

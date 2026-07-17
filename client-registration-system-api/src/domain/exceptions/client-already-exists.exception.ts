import { DomainException } from './domain.exception';

export class ClientAlreadyExistsException extends DomainException {
  constructor() {
    super(['Este CPF já está cadastrado']);
    this.name = ClientAlreadyExistsException.name;
  }
}

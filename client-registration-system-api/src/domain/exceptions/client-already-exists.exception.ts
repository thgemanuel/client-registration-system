import { DomainException } from './domain.exception';

export class ClientAlreadyExistsException extends DomainException {
  constructor() {
    super(['Um cliente com este CPF já está cadastrado.']);
    this.name = ClientAlreadyExistsException.name;
  }
}

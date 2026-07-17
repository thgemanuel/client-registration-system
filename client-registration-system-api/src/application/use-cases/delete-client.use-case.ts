import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from './usecase';
import {
  CLIENT_REPOSITORY_NAME,
  ClientRepository,
} from '@domain/repositories/client.repository';
import { EntityNotFoundException } from '@domain/exceptions/entity-not-found.exception';

@Injectable()
export class DeleteClientUseCase implements UseCase<string, void> {
  constructor(
    @Inject(CLIENT_REPOSITORY_NAME)
    private readonly clientRepository: ClientRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new EntityNotFoundException('Client not found');
    }

    await this.clientRepository.delete(id);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from './usecase';
import { ClientResponseDTO } from '@application/dto/client-response.dto';
import {
  CLIENT_REPOSITORY_NAME,
  ClientRepository,
} from '@domain/repositories/client.repository';
import { ClientMapper } from '@application/mappers/client.mapper';
import { EntityNotFoundException } from '@domain/exceptions/entity-not-found.exception';

@Injectable()
export class GetClientByIdUseCase implements UseCase<
  string,
  ClientResponseDTO
> {
  constructor(
    @Inject(CLIENT_REPOSITORY_NAME)
    private readonly clientRepository: ClientRepository,
    private readonly clientMapper: ClientMapper,
  ) {}

  async execute(id: string): Promise<ClientResponseDTO> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new EntityNotFoundException('Client not found');
    }

    return this.clientMapper.parseToDTO(client);
  }
}

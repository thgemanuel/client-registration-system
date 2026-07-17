import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from './usecase';
import { ClientResponseDTO } from '@application/dto/client-response.dto';
import { UpdateClientDTO } from '@application/dto/update-client.dto';
import {
  CLIENT_REPOSITORY_NAME,
  ClientRepository,
} from '@domain/repositories/client.repository';
import { ClientMapper } from '@application/mappers/client.mapper';
import { EntityNotFoundException } from '@domain/exceptions/entity-not-found.exception';
import { ClientEmailAlreadyExistsException } from '@domain/exceptions/client-email-already-exists.exception';

export interface UpdateClientUseCaseInput {
  id: string;
  dto: UpdateClientDTO;
}

@Injectable()
export class UpdateClientUseCase implements UseCase<
  UpdateClientUseCaseInput,
  ClientResponseDTO
> {
  constructor(
    @Inject(CLIENT_REPOSITORY_NAME)
    private readonly clientRepository: ClientRepository,
    private readonly clientMapper: ClientMapper,
  ) {}

  async execute(input: UpdateClientUseCaseInput): Promise<ClientResponseDTO> {
    const { id, dto } = input;

    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new EntityNotFoundException('Client not found');
    }

    if (dto.email && dto.email !== client.email) {
      const emailExists = await this.clientRepository.findByEmail(dto.email);
      if (emailExists) {
        throw new ClientEmailAlreadyExistsException();
      }
    }

    if (dto.fullName) client.fullName = dto.fullName;
    if (dto.email) client.email = dto.email;
    if (dto.favoriteColor) client.favoriteColor = dto.favoriteColor;
    if (dto.observations !== undefined) client.observations = dto.observations;

    const updatedClient = await this.clientRepository.update(client);
    return this.clientMapper.parseToDTO(updatedClient);
  }
}

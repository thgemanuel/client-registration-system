import { Injectable, Inject } from '@nestjs/common';
import { UseCase } from './usecase';
import { Client } from '@domain/entities/client.entity';
import { RegisterClientDTO } from '@application/dto/create-client.dto';
import { ClientResponseDTO } from '@application/dto/client-response.dto';
import {
  CLIENT_REPOSITORY_NAME,
  ClientRepository,
} from '@domain/repositories/client.repository';
import { ClientMapper } from '@application/mappers/client.mapper';
import { ClientAlreadyExistsException } from '@domain/exceptions/client-already-exists.exception';
import { ClientEmailAlreadyExistsException } from '@domain/exceptions/client-email-already-exists.exception';

@Injectable()
export class RegisterClientUseCase implements UseCase<
  RegisterClientDTO,
  ClientResponseDTO
> {
  constructor(
    @Inject(CLIENT_REPOSITORY_NAME)
    private readonly clientRepository: ClientRepository,
    private readonly clientMapper: ClientMapper,
  ) {}

  async execute(dto: RegisterClientDTO): Promise<ClientResponseDTO> {
    const existingClient = await this.clientRepository.findByCpf(dto.cpf);
    if (existingClient) {
      throw new ClientAlreadyExistsException();
    }

    const emailExists = await this.clientRepository.findByEmail(dto.email);
    if (emailExists) {
      throw new ClientEmailAlreadyExistsException();
    }

    const client: Client = this.clientMapper.parseToEntity(dto);

    const createdClient = await this.clientRepository.create(client);

    return this.clientMapper.parseToDTO(createdClient);
  }
}

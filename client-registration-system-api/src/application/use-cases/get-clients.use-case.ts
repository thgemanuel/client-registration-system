import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from './usecase';
import { ClientResponseDTO } from '@application/dto/client-response.dto';
import {
  CLIENT_REPOSITORY_NAME,
  ClientRepository,
} from '@domain/repositories/client.repository';
import { ClientMapper } from '@application/mappers/client.mapper';

@Injectable()
export class GetClientsUseCase implements UseCase<void, ClientResponseDTO[]> {
  constructor(
    @Inject(CLIENT_REPOSITORY_NAME)
    private readonly clientRepository: ClientRepository,
    private readonly clientMapper: ClientMapper,
  ) {}

  async execute(): Promise<ClientResponseDTO[]> {
    const clients = await this.clientRepository.findAll();
    return clients.map((client) => this.clientMapper.parseToDTO(client));
  }
}

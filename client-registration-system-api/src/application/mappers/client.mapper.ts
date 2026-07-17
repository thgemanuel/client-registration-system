import { Injectable } from '@nestjs/common';
import { Client } from '@domain/entities/client.entity';
import { RegisterClientDTO } from '@application/dto/create-client.dto';
import { ClientResponseDTO } from '@application/dto/client-response.dto';

@Injectable()
export class ClientMapper {
  parseToEntity(dto: RegisterClientDTO): Client {
    if (!dto) return null;

    const client = new Client();
    client.fullName = dto.fullName;
    client.cpf = dto.cpf;
    client.email = dto.email;
    client.favoriteColor = dto.favoriteColor;
    client.observations = dto.observations;

    return client;
  }

  parseToDTO(client: Client): ClientResponseDTO {
    if (!client) return null;

    const response = new ClientResponseDTO();
    response.id = client.id;
    response.fullName = client.fullName;
    response.cpf = client.cpf;
    response.email = client.email;
    response.favoriteColor = client.favoriteColor;
    response.observations = client.observations;
    response.insertedAt = client.insertedAt;

    return response;
  }
}

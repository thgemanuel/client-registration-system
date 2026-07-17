import { Client } from '@domain/entities/client.entity';
import { ClientTypeORM } from '../schemas/client.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientPersistenceMapper {
  fromEntityToSchema(client: Client): ClientTypeORM {
    if (!client) return null;

    const schema = new ClientTypeORM();
    schema.id = client.id;
    schema.fullName = client.fullName;
    schema.cpf = client.cpf;
    schema.email = client.email;
    schema.favoriteColor = client.favoriteColor;
    schema.observations = client.observations;

    return schema;
  }

  fromSchemaToEntity(schema: ClientTypeORM): Client {
    if (!schema) return null;

    const client = new Client();
    client.id = schema.id;
    client.fullName = schema.fullName;
    client.cpf = schema.cpf;
    client.email = schema.email;
    client.favoriteColor = schema.favoriteColor;
    client.observations = schema.observations;
    client.insertedAt = schema.insertedAt;
    client.updatedAt = schema.updatedAt;

    return client;
  }
}

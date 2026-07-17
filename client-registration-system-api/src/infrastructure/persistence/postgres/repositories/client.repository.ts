import { Repository } from 'typeorm';
import { Client } from '@domain/entities/client.entity';
import { ClientRepository } from '@domain/repositories/client.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientTypeORM } from '@infrastructure/persistence/postgres/schemas/client.schema';
import { ClientPersistenceMapper } from '@infrastructure/persistence/postgres/mappers/client.mapper';

@Injectable()
export class ClientRepositoryTypeORM implements ClientRepository {
  constructor(
    @InjectRepository(ClientTypeORM)
    private readonly typeOrmRepository: Repository<ClientTypeORM>,
    private readonly clientPersistenceMapper: ClientPersistenceMapper,
  ) {}

  async create(client: Client): Promise<Client> {
    let clientSchema = this.clientPersistenceMapper.fromEntityToSchema(client);

    clientSchema = await this.typeOrmRepository.save(clientSchema, {
      reload: true,
    });

    return this.clientPersistenceMapper.fromSchemaToEntity(clientSchema);
  }

  async findByCpf(cpf: string): Promise<Client | null> {
    const clientSchema = await this.typeOrmRepository.findOne({
      where: { cpf },
    });

    if (!clientSchema) return null;

    return this.clientPersistenceMapper.fromSchemaToEntity(clientSchema);
  }

  async findByEmail(email: string): Promise<Client | null> {
    const clientSchema = await this.typeOrmRepository.findOne({
      where: { email },
    });

    if (!clientSchema) return null;

    return this.clientPersistenceMapper.fromSchemaToEntity(clientSchema);
  }

  async findAll(): Promise<Client[]> {
    const schemas = await this.typeOrmRepository.find();
    return schemas.map((schema) =>
      this.clientPersistenceMapper.fromSchemaToEntity(schema),
    );
  }

  async findById(id: string): Promise<Client | null> {
    const schema = await this.typeOrmRepository.findOne({ where: { id } });
    if (!schema) return null;
    return this.clientPersistenceMapper.fromSchemaToEntity(schema);
  }

  async update(client: Client): Promise<Client> {
    let schema = this.clientPersistenceMapper.fromEntityToSchema(client);
    // Since 'id' is present, save() will perform an update.
    schema = await this.typeOrmRepository.save(schema, { reload: true });
    return this.clientPersistenceMapper.fromSchemaToEntity(schema);
  }

  async delete(id: string): Promise<void> {
    await this.typeOrmRepository.delete(id);
  }
}

import { Repository } from 'typeorm';
import { Client } from "../../../../domain/entities/client.entity";
import { ClientRepository } from "../../../../domain/repositories/client.repository";
import { ClientTypeORM } from "../schemas/client.schema";
import { ClientPersistenceMapper } from "../mappers/client.mapper";
export declare class ClientRepositoryTypeORM implements ClientRepository {
    private readonly typeOrmRepository;
    private readonly clientPersistenceMapper;
    constructor(typeOrmRepository: Repository<ClientTypeORM>, clientPersistenceMapper: ClientPersistenceMapper);
    create(client: Client): Promise<Client>;
    findByCpf(cpf: string): Promise<Client | null>;
}

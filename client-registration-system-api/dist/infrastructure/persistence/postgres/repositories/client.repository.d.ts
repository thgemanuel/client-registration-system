import { Repository } from 'typeorm';
import { ClientEntity } from "../../../../domain/entities/client.entity";
import { IClientRepository } from "../../../../domain/repositories/client.repository.interface";
import { ClientTypeORM } from '../schemas/client.schema';
import { ClientTypeOrmMapper } from '../mappers/client.mapper';
export declare class ClientRepositoryTypeORM implements IClientRepository {
    private readonly typeOrmRepository;
    private readonly clientTypeOrmMapper;
    constructor(typeOrmRepository: Repository<ClientTypeORM>, clientTypeOrmMapper: ClientTypeOrmMapper);
    create(client: ClientEntity): Promise<ClientEntity>;
    findById(id: string): Promise<ClientEntity | null>;
    findByCpf(cpf: string): Promise<ClientEntity | null>;
    findByEmail(email: string): Promise<ClientEntity | null>;
    findAll(): Promise<ClientEntity[]>;
    update(client: ClientEntity): Promise<ClientEntity>;
    delete(id: string): Promise<void>;
}

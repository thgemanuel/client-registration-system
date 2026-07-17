import { ClientEntity } from '../entities/client.entity';
export declare const CLIENTREPOSITORY_NAME = "IClientRepository";
export interface IClientRepository {
    create(client: ClientEntity): Promise<ClientEntity>;
    findById(id: string): Promise<ClientEntity | null>;
    findByCpf(cpf: string): Promise<ClientEntity | null>;
    findByEmail(email: string): Promise<ClientEntity | null>;
    findAll(): Promise<ClientEntity[]>;
    update(client: ClientEntity): Promise<ClientEntity>;
    delete(id: string): Promise<void>;
}

import { Client } from "../entities/client.entity";
export interface ClientRepository {
    create(client: Client): Promise<Client>;
    findByCpf(cpf: string): Promise<Client | null>;
    findByEmail(email: string): Promise<Client | null>;
    findAll(): Promise<Client[]>;
    findById(id: string): Promise<Client | null>;
    update(client: Client): Promise<Client>;
    delete(id: string): Promise<void>;
}
export declare const CLIENT_REPOSITORY_NAME = "ClientRepository";

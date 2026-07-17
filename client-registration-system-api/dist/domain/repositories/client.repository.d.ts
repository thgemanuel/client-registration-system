import { Client } from "../entities/client.entity";
export interface ClientRepository {
    create(client: Client): Promise<Client>;
    findByCpf(cpf: string): Promise<Client | null>;
}
export declare const CLIENT_REPOSITORY_NAME = "ClientRepository";

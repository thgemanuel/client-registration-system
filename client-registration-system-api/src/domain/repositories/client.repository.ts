import { Client } from '@domain/entities/client.entity';

export interface ClientRepository {
  create(client: Client): Promise<Client>;
  findByCpf(cpf: string): Promise<Client | null>;
}

export const CLIENT_REPOSITORY_NAME = 'ClientRepository';

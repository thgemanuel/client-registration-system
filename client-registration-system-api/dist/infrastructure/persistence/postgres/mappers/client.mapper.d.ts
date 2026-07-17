import { Client } from "../../../../domain/entities/client.entity";
import { ClientTypeORM } from '../schemas/client.schema';
export declare class ClientPersistenceMapper {
    fromEntityToSchema(client: Client): ClientTypeORM;
    fromSchemaToEntity(schema: ClientTypeORM): Client;
}

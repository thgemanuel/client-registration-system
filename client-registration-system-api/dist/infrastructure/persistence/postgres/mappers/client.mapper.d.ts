import { ClientEntity } from "../../../../domain/entities/client.entity";
import { ClientTypeORM } from '../schemas/client.schema';
export declare class ClientTypeOrmMapper {
    fromEntityToSchema(entity: ClientEntity): ClientTypeORM;
    fromSchemaToEntity(schema: ClientTypeORM): ClientEntity | null;
}

import { ClientEntity } from "../../domain/entities/client.entity";
import { CreateClientDTO } from "../dto/create-client.dto";
import { CreateClientResponseDTO } from "../dto/create-client-response.dto";
export declare class ClientMapper {
    parseToEntity(createClientDTO: CreateClientDTO): ClientEntity | null;
    parseToDTO(client: ClientEntity): CreateClientResponseDTO | null;
}

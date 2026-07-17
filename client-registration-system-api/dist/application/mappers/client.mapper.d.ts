import { Client } from "../../domain/entities/client.entity";
import { RegisterClientDTO } from "../dto/create-client.dto";
import { ClientResponseDTO } from "../dto/client-response.dto";
export declare class ClientMapper {
    parseToEntity(dto: RegisterClientDTO): Client;
    parseToDTO(client: Client): ClientResponseDTO;
}

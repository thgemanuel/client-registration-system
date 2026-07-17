import { Client } from "../../domain/entities/client.entity";
import { RegisterClientDTO } from "../dto/create-client.dto";
import { RegisterClientResponseDTO } from "../dto/create-client-response.dto";
export declare class ClientMapper {
    parseToEntity(dto: RegisterClientDTO): Client;
    parseToDTO(client: Client): RegisterClientResponseDTO;
}

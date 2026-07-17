import type { IClientRepository } from "../../domain/repositories/client.repository.interface";
import { CreateClientDTO } from "../dto/create-client.dto";
import { CreateClientResponseDTO } from "../dto/create-client-response.dto";
import { ClientMapper } from "../mappers/client.mapper";
export declare class CreateClientUseCase {
    private clientRepository;
    private readonly clientMapper;
    constructor(clientRepository: IClientRepository, clientMapper: ClientMapper);
    execute(dto: CreateClientDTO): Promise<CreateClientResponseDTO>;
}

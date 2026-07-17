import { UseCase } from './usecase';
import { ClientResponseDTO } from "../dto/client-response.dto";
import { ClientRepository } from "../../domain/repositories/client.repository";
import { ClientMapper } from "../mappers/client.mapper";
export declare class GetClientByIdUseCase implements UseCase<string, ClientResponseDTO> {
    private readonly clientRepository;
    private readonly clientMapper;
    constructor(clientRepository: ClientRepository, clientMapper: ClientMapper);
    execute(id: string): Promise<ClientResponseDTO>;
}

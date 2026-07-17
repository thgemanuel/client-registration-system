import { UseCase } from './usecase';
import { ClientResponseDTO } from "../dto/client-response.dto";
import { ClientRepository } from "../../domain/repositories/client.repository";
import { ClientMapper } from "../mappers/client.mapper";
export declare class GetClientsUseCase implements UseCase<void, ClientResponseDTO[]> {
    private readonly clientRepository;
    private readonly clientMapper;
    constructor(clientRepository: ClientRepository, clientMapper: ClientMapper);
    execute(): Promise<ClientResponseDTO[]>;
}

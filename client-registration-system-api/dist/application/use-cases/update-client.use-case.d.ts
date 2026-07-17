import { UseCase } from './usecase';
import { ClientResponseDTO } from "../dto/client-response.dto";
import { UpdateClientDTO } from "../dto/update-client.dto";
import { ClientRepository } from "../../domain/repositories/client.repository";
import { ClientMapper } from "../mappers/client.mapper";
export interface UpdateClientUseCaseInput {
    id: string;
    dto: UpdateClientDTO;
}
export declare class UpdateClientUseCase implements UseCase<UpdateClientUseCaseInput, ClientResponseDTO> {
    private readonly clientRepository;
    private readonly clientMapper;
    constructor(clientRepository: ClientRepository, clientMapper: ClientMapper);
    execute(input: UpdateClientUseCaseInput): Promise<ClientResponseDTO>;
}

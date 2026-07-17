import { UseCase } from './usecase';
import { RegisterClientDTO } from "../dto/create-client.dto";
import { ClientResponseDTO } from "../dto/client-response.dto";
import { ClientRepository } from "../../domain/repositories/client.repository";
import { ClientMapper } from "../mappers/client.mapper";
export declare class RegisterClientUseCase implements UseCase<RegisterClientDTO, ClientResponseDTO> {
    private readonly clientRepository;
    private readonly clientMapper;
    constructor(clientRepository: ClientRepository, clientMapper: ClientMapper);
    execute(dto: RegisterClientDTO): Promise<ClientResponseDTO>;
}

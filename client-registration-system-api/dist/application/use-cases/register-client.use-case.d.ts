import { UseCase } from './usecase';
import { RegisterClientDTO } from "../dto/create-client.dto";
import { RegisterClientResponseDTO } from "../dto/create-client-response.dto";
import { ClientRepository } from "../../domain/repositories/client.repository";
import { ClientMapper } from "../mappers/client.mapper";
export declare class RegisterClientUseCase implements UseCase<RegisterClientDTO, RegisterClientResponseDTO> {
    private readonly clientRepository;
    private readonly clientMapper;
    constructor(clientRepository: ClientRepository, clientMapper: ClientMapper);
    execute(dto: RegisterClientDTO): Promise<RegisterClientResponseDTO>;
}

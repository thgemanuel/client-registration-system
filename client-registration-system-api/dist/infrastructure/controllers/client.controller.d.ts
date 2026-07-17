import { CreateClientDTO } from "../../application/dto/create-client.dto";
import { CreateClientResponseDTO } from "../../application/dto/create-client-response.dto";
import { CreateClientUseCase } from "../../application/use-cases/create-client.use-case";
export declare class ClientController {
    private readonly createClientUseCase;
    constructor(createClientUseCase: CreateClientUseCase);
    createClient(dto: CreateClientDTO): Promise<CreateClientResponseDTO>;
}

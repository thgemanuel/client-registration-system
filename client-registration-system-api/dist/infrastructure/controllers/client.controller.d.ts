import { RegisterClientDTO } from "../../application/dto/create-client.dto";
import { RegisterClientResponseDTO } from "../../application/dto/create-client-response.dto";
import { RegisterClientUseCase } from "../../application/use-cases/register-client.use-case";
export declare class ClientController {
    private readonly registerClientUseCase;
    constructor(registerClientUseCase: RegisterClientUseCase);
    registerClient(dto: RegisterClientDTO): Promise<RegisterClientResponseDTO>;
}

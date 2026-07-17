import { RegisterClientDTO } from "../../application/dto/create-client.dto";
import { ClientResponseDTO } from "../../application/dto/client-response.dto";
import { RegisterClientUseCase } from "../../application/use-cases/register-client.use-case";
import { GetClientsUseCase } from "../../application/use-cases/get-clients.use-case";
import { GetClientByIdUseCase } from "../../application/use-cases/get-client-by-id.use-case";
import { UpdateClientUseCase } from "../../application/use-cases/update-client.use-case";
import { DeleteClientUseCase } from "../../application/use-cases/delete-client.use-case";
import { UpdateClientDTO } from "../../application/dto/update-client.dto";
export declare class ClientController {
    private readonly registerClientUseCase;
    private readonly getClientsUseCase;
    private readonly getClientByIdUseCase;
    private readonly updateClientUseCase;
    private readonly deleteClientUseCase;
    constructor(registerClientUseCase: RegisterClientUseCase, getClientsUseCase: GetClientsUseCase, getClientByIdUseCase: GetClientByIdUseCase, updateClientUseCase: UpdateClientUseCase, deleteClientUseCase: DeleteClientUseCase);
    registerClient(dto: RegisterClientDTO): Promise<ClientResponseDTO>;
    getClients(): Promise<ClientResponseDTO[]>;
    getClientById(id: string): Promise<ClientResponseDTO>;
    updateClient(id: string, dto: UpdateClientDTO): Promise<ClientResponseDTO>;
    deleteClient(id: string): Promise<void>;
}

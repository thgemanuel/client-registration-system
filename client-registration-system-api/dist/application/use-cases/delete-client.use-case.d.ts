import { UseCase } from './usecase';
import { ClientRepository } from "../../domain/repositories/client.repository";
export declare class DeleteClientUseCase implements UseCase<string, void> {
    private readonly clientRepository;
    constructor(clientRepository: ClientRepository);
    execute(id: string): Promise<void>;
}

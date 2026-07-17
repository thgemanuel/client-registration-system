import { GetClientByIdUseCase } from '@application/use-cases/get-client-by-id.use-case';
import { ClientMapper } from '@application/mappers/client.mapper';
import { ClientRepository } from '@domain/repositories/client.repository';
import { Client } from '@domain/entities/client.entity';
import { RainbowColorEnum } from '@domain/enums/rainbow-color.enum';
import { EntityNotFoundException } from '@domain/exceptions/entity-not-found.exception';

describe('GetClientByIdUseCase', () => {
  let useCase: GetClientByIdUseCase;
  let clientRepository: jest.Mocked<ClientRepository>;
  let clientMapper: ClientMapper;

  const mockClient: Client = Object.assign(new Client(), {
    id: 'uuid-abc',
    fullName: 'Jane Doe',
    cpf: '52998224725',
    email: 'jane@example.com',
    favoriteColor: RainbowColorEnum.GREEN,
    observations: 'Notes here',
    insertedAt: new Date('2024-06-01T10:00:00Z'),
  });

  beforeEach(() => {
    clientRepository = {
      create: jest.fn(),
      findByCpf: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<ClientRepository>;

    clientMapper = new ClientMapper();
    useCase = new GetClientByIdUseCase(clientRepository, clientMapper);
  });

  it('should return the mapped ClientResponseDTO when client is found', async () => {
    clientRepository.findById.mockResolvedValue(mockClient);

    const result = await useCase.execute('uuid-abc');

    expect(clientRepository.findById).toHaveBeenCalledWith('uuid-abc');
    expect(result.id).toBe(mockClient.id);
    expect(result.fullName).toBe(mockClient.fullName);
    expect(result.cpf).toBe(mockClient.cpf);
    expect(result.email).toBe(mockClient.email);
    expect(result.favoriteColor).toBe(mockClient.favoriteColor);
    expect(result.observations).toBe(mockClient.observations);
    expect(result.insertedAt).toBe(mockClient.insertedAt);
  });

  it('should throw EntityNotFoundException when client is not found', async () => {
    clientRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('non-existent-id')).rejects.toThrow(
      EntityNotFoundException,
    );

    expect(clientRepository.findById).toHaveBeenCalledWith('non-existent-id');
  });

  it('should throw EntityNotFoundException with the correct message', async () => {
    clientRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('some-id')).rejects.toThrow('Client not found');
  });
});

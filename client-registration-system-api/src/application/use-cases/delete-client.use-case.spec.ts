import { DeleteClientUseCase } from '@application/use-cases/delete-client.use-case';
import { ClientRepository } from '@domain/repositories/client.repository';
import { Client } from '@domain/entities/client.entity';
import { RainbowColorEnum } from '@domain/enums/rainbow-color.enum';
import { EntityNotFoundException } from '@domain/exceptions/entity-not-found.exception';

describe('DeleteClientUseCase', () => {
  let useCase: DeleteClientUseCase;
  let clientRepository: jest.Mocked<ClientRepository>;

  const mockClient: Client = Object.assign(new Client(), {
    id: 'uuid-abc',
    fullName: 'Jane Doe',
    cpf: '52998224725',
    email: 'jane@example.com',
    favoriteColor: RainbowColorEnum.GREEN,
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

    useCase = new DeleteClientUseCase(clientRepository);
  });

  it('should delete the client successfully when it exists', async () => {
    clientRepository.findById.mockResolvedValue(mockClient);
    clientRepository.delete.mockResolvedValue(undefined);

    await expect(useCase.execute('uuid-abc')).resolves.toBeUndefined();

    expect(clientRepository.findById).toHaveBeenCalledWith('uuid-abc');
    expect(clientRepository.delete).toHaveBeenCalledWith('uuid-abc');
  });

  it('should throw EntityNotFoundException when client does not exist', async () => {
    clientRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('non-existent-id')).rejects.toThrow(
      EntityNotFoundException,
    );

    expect(clientRepository.delete).not.toHaveBeenCalled();
  });

  it('should throw EntityNotFoundException with the correct message', async () => {
    clientRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('some-id')).rejects.toThrow('Client not found');
  });

  it('should call delete with the exact same id used in findById', async () => {
    const specificId = 'specific-uuid-xyz';
    clientRepository.findById.mockResolvedValue(mockClient);
    clientRepository.delete.mockResolvedValue(undefined);

    await useCase.execute(specificId);

    expect(clientRepository.delete).toHaveBeenCalledWith(specificId);
  });
});

import { UpdateClientUseCase } from '@application/use-cases/update-client.use-case';
import { ClientMapper } from '@application/mappers/client.mapper';
import { ClientRepository } from '@domain/repositories/client.repository';
import { Client } from '@domain/entities/client.entity';
import { UpdateClientDTO } from '@application/dto/update-client.dto';
import { RainbowColorEnum } from '@domain/enums/rainbow-color.enum';
import { EntityNotFoundException } from '@domain/exceptions/entity-not-found.exception';
import { ClientEmailAlreadyExistsException } from '@domain/exceptions/client-email-already-exists.exception';

describe('UpdateClientUseCase', () => {
  let useCase: UpdateClientUseCase;
  let clientRepository: jest.Mocked<ClientRepository>;
  let clientMapper: ClientMapper;

  const existingClient: Client = Object.assign(new Client(), {
    id: 'uuid-abc',
    fullName: 'Jane Doe',
    cpf: '52998224725',
    email: 'jane@example.com',
    favoriteColor: RainbowColorEnum.GREEN,
    observations: undefined,
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
    useCase = new UpdateClientUseCase(clientRepository, clientMapper);
  });

  it('should update and return the mapped ClientResponseDTO on success', async () => {
    const dto: UpdateClientDTO = { fullName: 'Jane Smith' };
    const updatedClient: Client = Object.assign(new Client(), {
      ...existingClient,
      fullName: 'Jane Smith',
    });

    clientRepository.findById.mockResolvedValue(existingClient);
    clientRepository.update.mockResolvedValue(updatedClient);

    const result = await useCase.execute({ id: 'uuid-abc', dto });

    expect(clientRepository.findById).toHaveBeenCalledWith('uuid-abc');
    expect(clientRepository.update).toHaveBeenCalledTimes(1);
    expect(result.fullName).toBe('Jane Smith');
    expect(result.id).toBe('uuid-abc');
  });

  it('should throw EntityNotFoundException when client does not exist', async () => {
    clientRepository.findById.mockResolvedValue(null);

    await expect(
      useCase.execute({ id: 'non-existent', dto: { fullName: 'X' } }),
    ).rejects.toThrow(EntityNotFoundException);

    expect(clientRepository.update).not.toHaveBeenCalled();
  });

  it('should throw ClientEmailAlreadyExistsException when new email is already in use', async () => {
    const dto: UpdateClientDTO = { email: 'taken@example.com' };
    const otherClient: Client = Object.assign(new Client(), {
      ...existingClient,
      id: 'uuid-other',
      email: 'taken@example.com',
    });

    clientRepository.findById.mockResolvedValue(existingClient);
    clientRepository.findByEmail.mockResolvedValue(otherClient);

    await expect(useCase.execute({ id: 'uuid-abc', dto })).rejects.toThrow(
      ClientEmailAlreadyExistsException,
    );

    expect(clientRepository.update).not.toHaveBeenCalled();
  });

  it('should not check email uniqueness when the email is the same as the current one', async () => {
    const dto: UpdateClientDTO = { email: 'jane@example.com' };
    const updatedClient: Client = Object.assign(new Client(), { ...existingClient });

    clientRepository.findById.mockResolvedValue(existingClient);
    clientRepository.update.mockResolvedValue(updatedClient);

    await useCase.execute({ id: 'uuid-abc', dto });

    expect(clientRepository.findByEmail).not.toHaveBeenCalled();
    expect(clientRepository.update).toHaveBeenCalledTimes(1);
  });

  it('should update only the provided fields', async () => {
    const dto: UpdateClientDTO = { favoriteColor: RainbowColorEnum.RED };
    const updatedClient: Client = Object.assign(new Client(), {
      ...existingClient,
      favoriteColor: RainbowColorEnum.RED,
    });

    clientRepository.findById.mockResolvedValue(existingClient);
    clientRepository.update.mockResolvedValue(updatedClient);

    const result = await useCase.execute({ id: 'uuid-abc', dto });

    expect(result.favoriteColor).toBe(RainbowColorEnum.RED);
    expect(result.fullName).toBe(existingClient.fullName);
    expect(result.email).toBe(existingClient.email);
  });

  it('should update observations to an empty string when explicitly set', async () => {
    const dto: UpdateClientDTO = { observations: '' };
    const updatedClient: Client = Object.assign(new Client(), {
      ...existingClient,
      observations: '',
    });

    clientRepository.findById.mockResolvedValue(existingClient);
    clientRepository.update.mockResolvedValue(updatedClient);

    const result = await useCase.execute({ id: 'uuid-abc', dto });

    expect(result.observations).toBe('');
  });
});

import { RegisterClientUseCase } from '@application/use-cases/register-client.use-case';
import { ClientMapper } from '@application/mappers/client.mapper';
import { ClientRepository } from '@domain/repositories/client.repository';
import { Client } from '@domain/entities/client.entity';
import { RegisterClientDTO } from '@application/dto/create-client.dto';
import { ClientResponseDTO } from '@application/dto/client-response.dto';
import { RainbowColorEnum } from '@domain/enums/rainbow-color.enum';
import { ClientAlreadyExistsException } from '@domain/exceptions/client-already-exists.exception';

describe('RegisterClientUseCase', () => {
  let useCase: RegisterClientUseCase;
  let clientRepository: jest.Mocked<ClientRepository>;
  let clientMapper: ClientMapper;

  const mockDto: RegisterClientDTO = {
    fullName: 'Jane Doe',
    cpf: '52998224725',
    email: 'jane@example.com',
    favoriteColor: RainbowColorEnum.GREEN,
    observations: undefined,
  };

  const mockCreatedClient: Client = Object.assign(new Client(), {
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

    useCase = new RegisterClientUseCase(clientRepository, clientMapper);
  });

  it('should register a new client and return the response DTO', async () => {
    clientRepository.findByCpf.mockResolvedValue(null);
    clientRepository.create.mockResolvedValue(mockCreatedClient);

    const result = await useCase.execute(mockDto);

    expect(clientRepository.findByCpf).toHaveBeenCalledWith(mockDto.cpf);
    expect(clientRepository.create).toHaveBeenCalledTimes(1);
    expect(result.id).toBe(mockCreatedClient.id);
    expect(result.fullName).toBe(mockCreatedClient.fullName);
    expect(result.cpf).toBe(mockCreatedClient.cpf);
    expect(result.email).toBe(mockCreatedClient.email);
    expect(result.favoriteColor).toBe(mockCreatedClient.favoriteColor);
  });

  it('should throw ClientAlreadyExistsException when CPF is already registered', async () => {
    clientRepository.findByCpf.mockResolvedValue(mockCreatedClient);

    await expect(useCase.execute(mockDto)).rejects.toThrow(
      ClientAlreadyExistsException,
    );

    expect(clientRepository.create).not.toHaveBeenCalled();
  });

  it('should not create a client when findByCpf returns an existing client', async () => {
    clientRepository.findByCpf.mockResolvedValue(mockCreatedClient);

    try {
      await useCase.execute(mockDto);
    } catch (e) {
      // expected
    }

    expect(clientRepository.create).toHaveBeenCalledTimes(0);
  });
});

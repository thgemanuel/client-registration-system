import { GetClientsUseCase } from '@application/use-cases/get-clients.use-case';
import { ClientMapper } from '@application/mappers/client.mapper';
import { ClientRepository } from '@domain/repositories/client.repository';
import { Client } from '@domain/entities/client.entity';
import { RainbowColorEnum } from '@domain/enums/rainbow-color.enum';

describe('GetClientsUseCase', () => {
  let useCase: GetClientsUseCase;
  let clientRepository: jest.Mocked<ClientRepository>;
  let clientMapper: ClientMapper;

  const makeClient = (overrides: Partial<Client> = {}): Client =>
    Object.assign(new Client(), {
      id: 'uuid-1',
      fullName: 'John Doe',
      cpf: '52998224725',
      email: 'john@example.com',
      favoriteColor: RainbowColorEnum.BLUE,
      observations: undefined,
      insertedAt: new Date('2024-01-01T00:00:00Z'),
      ...overrides,
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
    useCase = new GetClientsUseCase(clientRepository, clientMapper);
  });

  it('should return an empty array when no clients exist', async () => {
    clientRepository.findAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(clientRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it('should return a list of mapped ClientResponseDTOs', async () => {
    const clients = [
      makeClient({ id: 'uuid-1', email: 'a@example.com', cpf: '52998224725' }),
      makeClient({ id: 'uuid-2', email: 'b@example.com', cpf: '11144477735' }),
    ];
    clientRepository.findAll.mockResolvedValue(clients);

    const result = await useCase.execute();

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('uuid-1');
    expect(result[1].id).toBe('uuid-2');
    expect(result[0].email).toBe('a@example.com');
    expect(result[1].email).toBe('b@example.com');
  });

  it('should correctly map all fields of each client', async () => {
    const client = makeClient({ observations: 'VIP' });
    clientRepository.findAll.mockResolvedValue([client]);

    const result = await useCase.execute();

    expect(result[0].fullName).toBe(client.fullName);
    expect(result[0].cpf).toBe(client.cpf);
    expect(result[0].favoriteColor).toBe(client.favoriteColor);
    expect(result[0].observations).toBe('VIP');
    expect(result[0].insertedAt).toBe(client.insertedAt);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from '@infrastructure/controllers/client.controller';
import { RegisterClientUseCase } from '@application/use-cases/register-client.use-case';
import { RegisterClientDTO } from '@application/dto/create-client.dto';
import { GetClientsUseCase } from '@application/use-cases/get-clients.use-case';
import { GetClientByIdUseCase } from '@application/use-cases/get-client-by-id.use-case';
import { UpdateClientUseCase } from '@application/use-cases/update-client.use-case';
import { DeleteClientUseCase } from '@application/use-cases/delete-client.use-case';
import { ClientResponseDTO } from '@application/dto/client-response.dto';
import { RainbowColorEnum } from '@domain/enums/rainbow-color.enum';
import { ClientAlreadyExistsException } from '@domain/exceptions/client-already-exists.exception';

describe('ClientController', () => {
  let controller: ClientController;
  let useCase: jest.Mocked<RegisterClientUseCase>;

  const mockDto: RegisterClientDTO = {
    fullName: 'Test User',
    cpf: '12345678901',
    email: 'test@example.com',
    favoriteColor: RainbowColorEnum.RED,
  };

  const mockResponse: ClientResponseDTO = {
    id: '123',
    fullName: 'Test User',
    cpf: '12345678901',
    email: 'test@example.com',
    favoriteColor: RainbowColorEnum.RED,
    observations: undefined,
    insertedAt: new Date(),
  };

  beforeEach(async () => {
    const mockUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        {
          provide: RegisterClientUseCase,
          useValue: mockUseCase,
        },
        {
          provide: GetClientsUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetClientByIdUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateClientUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: DeleteClientUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    useCase = module.get(RegisterClientUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('registerClient', () => {
    it('should call useCase.execute and return the result', async () => {
      useCase.execute.mockResolvedValue(mockResponse);

      const result = await controller.registerClient(mockDto);

      expect(useCase.execute).toHaveBeenCalledWith(mockDto);
      expect(result).toEqual(mockResponse);
    });

    it('should throw an exception if useCase throws', async () => {
      const error = new ClientAlreadyExistsException();
      useCase.execute.mockRejectedValue(error);

      await expect(controller.registerClient(mockDto)).rejects.toThrow(error);
    });
  });
});

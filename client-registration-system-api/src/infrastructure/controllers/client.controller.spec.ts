import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from '@infrastructure/controllers/client.controller';
import { RegisterClientUseCase } from '@application/use-cases/register-client.use-case';
import { GetClientsUseCase } from '@application/use-cases/get-clients.use-case';
import { GetClientByIdUseCase } from '@application/use-cases/get-client-by-id.use-case';
import { UpdateClientUseCase } from '@application/use-cases/update-client.use-case';
import { DeleteClientUseCase } from '@application/use-cases/delete-client.use-case';
import { RegisterClientDTO } from '@application/dto/create-client.dto';
import { UpdateClientDTO } from '@application/dto/update-client.dto';
import { ClientResponseDTO } from '@application/dto/client-response.dto';
import { RainbowColorEnum } from '@domain/enums/rainbow-color.enum';
import { ClientAlreadyExistsException } from '@domain/exceptions/client-already-exists.exception';
import { EntityNotFoundException } from '@domain/exceptions/entity-not-found.exception';

describe('ClientController', () => {
  let controller: ClientController;
  let registerUseCase: jest.Mocked<RegisterClientUseCase>;
  let getClientsUseCase: jest.Mocked<GetClientsUseCase>;
  let getClientByIdUseCase: jest.Mocked<GetClientByIdUseCase>;
  let updateClientUseCase: jest.Mocked<UpdateClientUseCase>;
  let deleteClientUseCase: jest.Mocked<DeleteClientUseCase>;

  const mockResponse: ClientResponseDTO = {
    id: 'uuid-123',
    fullName: 'Test User',
    cpf: '52998224725',
    email: 'test@example.com',
    favoriteColor: RainbowColorEnum.RED,
    observations: undefined,
    insertedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        { provide: RegisterClientUseCase, useValue: { execute: jest.fn() } },
        { provide: GetClientsUseCase, useValue: { execute: jest.fn() } },
        { provide: GetClientByIdUseCase, useValue: { execute: jest.fn() } },
        { provide: UpdateClientUseCase, useValue: { execute: jest.fn() } },
        { provide: DeleteClientUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    registerUseCase = module.get(RegisterClientUseCase);
    getClientsUseCase = module.get(GetClientsUseCase);
    getClientByIdUseCase = module.get(GetClientByIdUseCase);
    updateClientUseCase = module.get(UpdateClientUseCase);
    deleteClientUseCase = module.get(DeleteClientUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('registerClient (POST /clients)', () => {
    const dto: RegisterClientDTO = {
      fullName: 'Test User',
      cpf: '52998224725',
      email: 'test@example.com',
      favoriteColor: RainbowColorEnum.RED,
    };

    it('should call RegisterClientUseCase.execute and return the result', async () => {
      registerUseCase.execute.mockResolvedValue(mockResponse);

      const result = await controller.registerClient(dto);

      expect(registerUseCase.execute).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResponse);
    });

    it('should propagate exceptions thrown by the use case', async () => {
      const error = new ClientAlreadyExistsException();
      registerUseCase.execute.mockRejectedValue(error);

      await expect(controller.registerClient(dto)).rejects.toThrow(error);
    });
  });

  describe('getClients (GET /clients)', () => {
    it('should return an array of clients', async () => {
      getClientsUseCase.execute.mockResolvedValue([mockResponse]);

      const result = await controller.getClients();

      expect(getClientsUseCase.execute).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockResponse]);
    });

    it('should return an empty array when no clients exist', async () => {
      getClientsUseCase.execute.mockResolvedValue([]);

      const result = await controller.getClients();

      expect(result).toEqual([]);
    });
  });

  describe('getClientById (GET /clients/:id)', () => {
    it('should return the client when found', async () => {
      getClientByIdUseCase.execute.mockResolvedValue(mockResponse);

      const result = await controller.getClientById('uuid-123');

      expect(getClientByIdUseCase.execute).toHaveBeenCalledWith('uuid-123');
      expect(result).toEqual(mockResponse);
    });

    it('should propagate EntityNotFoundException when client is not found', async () => {
      getClientByIdUseCase.execute.mockRejectedValue(
        new EntityNotFoundException('Client not found'),
      );

      await expect(controller.getClientById('non-existent')).rejects.toThrow(
        EntityNotFoundException,
      );
    });
  });

  describe('updateClient (PUT /clients/:id)', () => {
    const updateDto: UpdateClientDTO = { fullName: 'Updated Name' };

    it('should call UpdateClientUseCase.execute with id and dto and return result', async () => {
      const updatedResponse = { ...mockResponse, fullName: 'Updated Name' };
      updateClientUseCase.execute.mockResolvedValue(updatedResponse);

      const result = await controller.updateClient('uuid-123', updateDto);

      expect(updateClientUseCase.execute).toHaveBeenCalledWith({
        id: 'uuid-123',
        dto: updateDto,
      });
      expect(result.fullName).toBe('Updated Name');
    });

    it('should propagate EntityNotFoundException when client is not found', async () => {
      updateClientUseCase.execute.mockRejectedValue(
        new EntityNotFoundException('Client not found'),
      );

      await expect(
        controller.updateClient('non-existent', updateDto),
      ).rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('deleteClient (DELETE /clients/:id)', () => {
    it('should call DeleteClientUseCase.execute with the given id', async () => {
      deleteClientUseCase.execute.mockResolvedValue(undefined);

      await controller.deleteClient('uuid-123');

      expect(deleteClientUseCase.execute).toHaveBeenCalledWith('uuid-123');
    });

    it('should propagate EntityNotFoundException when client is not found', async () => {
      deleteClientUseCase.execute.mockRejectedValue(
        new EntityNotFoundException('Client not found'),
      );

      await expect(controller.deleteClient('non-existent')).rejects.toThrow(
        EntityNotFoundException,
      );
    });
  });
});

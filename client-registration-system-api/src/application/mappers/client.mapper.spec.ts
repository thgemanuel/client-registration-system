import { ClientMapper } from '@application/mappers/client.mapper';
import { RegisterClientDTO } from '@application/dto/create-client.dto';
import { Client } from '@domain/entities/client.entity';
import { RainbowColorEnum } from '@domain/enums/rainbow-color.enum';
import { RegisterClientResponseDTO } from '@application/dto/create-client-response.dto';

describe('ClientMapper', () => {
  let mapper: ClientMapper;

  const mockDto: RegisterClientDTO = {
    fullName: 'John Doe',
    cpf: '52998224725',
    email: 'john@example.com',
    favoriteColor: RainbowColorEnum.BLUE,
    observations: 'VIP client',
  };

  const mockClient: Client = Object.assign(new Client(), {
    id: 'uuid-123',
    fullName: 'John Doe',
    cpf: '52998224725',
    email: 'john@example.com',
    favoriteColor: RainbowColorEnum.BLUE,
    observations: 'VIP client',
    insertedAt: new Date('2024-01-01T00:00:00Z'),
  });

  beforeEach(() => {
    mapper = new ClientMapper();
  });

  describe('parseToEntity', () => {
    it('should map a RegisterClientDTO to a Client entity', () => {
      const result = mapper.parseToEntity(mockDto);

      expect(result).toBeInstanceOf(Client);
      expect(result.fullName).toBe(mockDto.fullName);
      expect(result.cpf).toBe(mockDto.cpf);
      expect(result.email).toBe(mockDto.email);
      expect(result.favoriteColor).toBe(mockDto.favoriteColor);
      expect(result.observations).toBe(mockDto.observations);
    });

    it('should map DTO without optional observations', () => {
      const dtoWithoutObs: RegisterClientDTO = { ...mockDto, observations: undefined };
      const result = mapper.parseToEntity(dtoWithoutObs);

      expect(result.observations).toBeUndefined();
    });

    it('should return null when dto is null', () => {
      const result = mapper.parseToEntity(null as any);

      expect(result).toBeNull();
    });
  });

  describe('parseToDTO', () => {
    it('should map a Client entity to a RegisterClientResponseDTO', () => {
      const result = mapper.parseToDTO(mockClient);

      expect(result).toBeInstanceOf(RegisterClientResponseDTO);
      expect(result.id).toBe(mockClient.id);
      expect(result.fullName).toBe(mockClient.fullName);
      expect(result.cpf).toBe(mockClient.cpf);
      expect(result.email).toBe(mockClient.email);
      expect(result.favoriteColor).toBe(mockClient.favoriteColor);
      expect(result.observations).toBe(mockClient.observations);
      expect(result.insertedAt).toBe(mockClient.insertedAt);
    });

    it('should return null when client is null', () => {
      const result = mapper.parseToDTO(null as any);

      expect(result).toBeNull();
    });
  });
});

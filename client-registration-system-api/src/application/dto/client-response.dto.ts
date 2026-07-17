import { RainbowColorEnum } from '@domain/enums/rainbow-color.enum';

export class ClientResponseDTO {
  /**
   * Id do cliente cadastrado.
   * @example 'da771fe7-0095-4404-8afb-f7c895eba0b7'
   */
  id: string;

  /**
   * Nome completo do cliente.
   * @example 'John Doe'
   */
  fullName: string;

  /**
   * CPF do cliente.
   * @example '12345678901'
   */
  cpf: string;

  /**
   * E-mail do cliente.
   * @example 'john.doe@example.com'
   */
  email: string;

  /**
   * Cor preferida do cliente.
   * @example 'blue'
   */
  favoriteColor: RainbowColorEnum;

  /**
   * Observações adicionais.
   * @example 'Cliente VIP'
   */
  observations?: string;

  /**
   * Data de criação do registro.
   */
  insertedAt: Date;
}

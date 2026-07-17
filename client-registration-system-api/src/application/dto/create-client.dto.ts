import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { RainbowColorEnum } from '@domain/enums/rainbow-color.enum';

export class RegisterClientDTO {
  /**
   * Nome completo do cliente.
   * @example 'John Doe'
   */
  @IsNotEmpty({ message: 'O campo fullName (nome completo) é obrigatório.' })
  @IsString({ message: 'O campo fullName deve ser uma string válida.' })
  fullName: string;

  /**
   * CPF do cliente (somente números, 11 dígitos).
   * @example '12345678901'
   */
  @IsNotEmpty({ message: 'O campo cpf é obrigatório.' })
  @IsString({ message: 'O campo cpf deve ser uma string.' })
  @Matches(/^\d{11}$/, {
    message: 'O campo cpf deve conter exatamente 11 dígitos numéricos.',
  })
  cpf: string;

  /**
   * E-mail do cliente.
   * @example 'john.doe@example.com'
   */
  @IsNotEmpty({ message: 'O campo email é obrigatório.' })
  @IsEmail({}, { message: 'O campo email deve ser um e-mail válido.' })
  email: string;

  /**
   * Cor preferida do cliente (cores do arco-íris).
   * @example 'blue'
   */
  @IsNotEmpty({
    message: 'O campo favoriteColor (cor preferida) é obrigatório.',
  })
  @IsEnum(RainbowColorEnum, {
    message: `O campo favoriteColor deve ser uma das seguintes cores: ${Object.values(RainbowColorEnum).join(', ')}.`,
  })
  favoriteColor: RainbowColorEnum;

  /**
   * Observações adicionais (opcional).
   * @example 'Cliente VIP'
   */
  @IsOptional()
  @IsString({ message: 'O campo observations deve ser uma string.' })
  observations?: string;
}

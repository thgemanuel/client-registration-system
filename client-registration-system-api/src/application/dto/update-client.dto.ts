import { OmitType, PartialType } from '@nestjs/swagger';
import { RegisterClientDTO } from './create-client.dto';

export class UpdateClientDTO extends PartialType(
  OmitType(RegisterClientDTO, ['cpf'] as const),
) {}

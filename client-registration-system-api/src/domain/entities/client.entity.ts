import { AbstractEntity } from './abstract.entity';
import { RainbowColorEnum } from '@domain/enums/rainbow-color.enum';

export class Client extends AbstractEntity {
  fullName: string;
  cpf: string;
  email: string;
  favoriteColor: RainbowColorEnum;
  observations?: string;
}

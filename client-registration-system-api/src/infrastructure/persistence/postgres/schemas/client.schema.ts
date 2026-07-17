import { Column, Entity } from 'typeorm';
import { AbstractSchema } from './abstract.schema';
import { RainbowColorEnum } from '@domain/enums/rainbow-color.enum';

@Entity('clients')
export class ClientTypeORM extends AbstractSchema {
  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ unique: true })
  email: string;

  @Column({
    name: 'favorite_color',
    type: 'enum',
    enum: RainbowColorEnum,
  })
  favoriteColor: RainbowColorEnum;

  @Column({ nullable: true, type: 'text' })
  observations: string;
}

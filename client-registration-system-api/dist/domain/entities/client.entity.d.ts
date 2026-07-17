import { AbstractEntity } from './abstract.entity';
import { RainbowColorEnum } from "../enums/rainbow-color.enum";
export declare class Client extends AbstractEntity {
    fullName: string;
    cpf: string;
    email: string;
    favoriteColor: RainbowColorEnum;
    observations?: string;
}

import { AbstractSchema } from './abstract.schema';
import { RainbowColorEnum } from "../../../../domain/enums/rainbow-color.enum";
export declare class ClientTypeORM extends AbstractSchema {
    fullName: string;
    cpf: string;
    email: string;
    favoriteColor: RainbowColorEnum;
    observations: string;
}

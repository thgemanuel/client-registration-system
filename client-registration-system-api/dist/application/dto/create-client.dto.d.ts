import { RainbowColorEnum } from "../../domain/enums/rainbow-color.enum";
export declare class RegisterClientDTO {
    fullName: string;
    cpf: string;
    email: string;
    favoriteColor: RainbowColorEnum;
    observations?: string;
}

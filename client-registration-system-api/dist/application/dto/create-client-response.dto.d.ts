import { RainbowColorEnum } from "../../domain/enums/rainbow-color.enum";
export declare class RegisterClientResponseDTO {
    id: string;
    fullName: string;
    cpf: string;
    email: string;
    favoriteColor: RainbowColorEnum;
    observations?: string;
    insertedAt: Date;
}

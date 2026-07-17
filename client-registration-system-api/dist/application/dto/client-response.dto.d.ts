import { RainbowColorEnum } from "../../domain/enums/rainbow-color.enum";
export declare class ClientResponseDTO {
    id: string;
    fullName: string;
    cpf: string;
    email: string;
    favoriteColor: RainbowColorEnum;
    observations?: string;
    insertedAt: Date;
}

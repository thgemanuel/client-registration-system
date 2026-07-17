import { RainbowColorKey } from "@/app/[locale]/cadastro/types/client.types";

export interface CreateClientInput {
  fullName: string;
  cpf: string;
  email: string;
  favoriteColor: RainbowColorKey;
  observations?: string;
}

export interface CreateClientOutput {
  id: string;
  createdAt: string;
}

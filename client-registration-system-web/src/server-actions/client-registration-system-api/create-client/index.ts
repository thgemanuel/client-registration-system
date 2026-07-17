"use server";

import { ActionResult } from "@/shared/types/action-result.types";
import { CreateClientInput, CreateClientOutput } from "./types";

export async function createClientAction(
  input: CreateClientInput
): Promise<ActionResult<CreateClientOutput>> {
  console.log("[Server Action] Recebendo payload para criar cliente:", input);

  // TODO: Implementar chamada real ao endpoint POST /clients usando fetch()
  
  // Simulando latência de rede (1.5 segundos)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulando sucesso do retorno
  console.log("[Server Action] Mock: Cliente criado com sucesso.");

  return {
    success: true,
    data: {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    },
  };
}

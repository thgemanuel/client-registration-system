"use server";

import { ActionResult } from "@/shared/types/action-result.types";
import { CreateClientInput, CreateClientOutput } from "./types";

export async function createClientAction(
  input: CreateClientInput
): Promise<ActionResult<CreateClientOutput>> {
  try {
    const apiUrl = process.env.CLIENT_REGISTRATION_API_URL;
    if (!apiUrl) {
      throw new Error("CLIENT_REGISTRATION_API_URL environment variable is not defined");
    }
    const response = await fetch(`${apiUrl}/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    const data = await response.json();

    if (!response.ok) {
      // Backend returns validation errors in data.errors[] 
      // We will take the first error reason, or a generic message.
      const errorMsg = data?.errors?.[0]?.reason || 'Erro ao salvar cliente no banco de dados.';
      return {
        success: false,
        error: errorMsg,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("[createClientAction] Erro de rede ou indisponibilidade:", error);
    return {
      success: false,
      error: "Erro ao conectar com o servidor.",
    };
  }
}

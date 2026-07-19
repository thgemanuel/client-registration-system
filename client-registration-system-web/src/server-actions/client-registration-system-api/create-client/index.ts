"use server";

import { ActionResult } from "@/shared/types/action-result.types";
import { CreateClientInput, CreateClientOutput } from "./types";
import { ClientRegistrationSystemExceptions } from "../enums/client-registration-system-api-domain-exceptions.enum";

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
      // We will check if it is a domain conflict error to handle it securely.
      const firstError = data?.errors?.[0];
      const errorCode = firstError?.code;

      if (
        errorCode === ClientRegistrationSystemExceptions.ClientAlreadyExistsException ||
        errorCode === ClientRegistrationSystemExceptions.ClientEmailAlreadyExistsException
      ) {
        return {
          success: false,
          error: "CLIENT_ALREADY_EXISTS",
        };
      }

      const errorMsg = firstError?.reason || 'Erro ao salvar cliente no banco de dados.';
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

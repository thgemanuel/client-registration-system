"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { getClientRegistrationSchema } from "../schemas/client.schema";
import { ClientRegistrationInput } from "../types/client.types";
import { createClientAction } from "@/server-actions/client-registration-system-api/create-client";

export type FormStatus = "idle" | "loading" | "success" | "error";

export function useClientRegistrationForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const tForm = useTranslations("Form");
  const tSchema = useTranslations("Schema");
  const tColors = useTranslations("Colors");

  const form = useForm<ClientRegistrationInput>({
    resolver: zodResolver(getClientRegistrationSchema(tSchema)),
    defaultValues: {
      fullName: "",
      cpf: "",
      email: "",
      observations: "",
    },
  });

  const onSubmit = async (data: ClientRegistrationInput) => {
    setStatus("loading");
    setErrorKey(null);
    try {
      const result = await createClientAction(data);
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        if (result.error === "CLIENT_ALREADY_EXISTS") {
          setErrorKey("conflictErrorMessage");
        } else {
          setErrorKey("errorMessage");
        }
      }
    } catch {
      setStatus("error");
      setErrorKey("errorMessage");
    }
  };

  const onReset = () => {
    setStatus("idle");
    setErrorKey(null);
  };

  return {
    form,
    status,
    errorKey,
    onSubmit,
    onReset,
    tForm,
    tColors,
  };
}

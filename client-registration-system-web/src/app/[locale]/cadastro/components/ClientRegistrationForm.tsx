"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { getClientRegistrationSchema, RainbowColor } from "@/shared/schemas/client.schema";
import { ClientRegistrationInput } from "@/shared/types/client.types";
import { createClientAction } from "@/server-actions/client-registration-system-api/create-client";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ClientRegistrationForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const tForm = useTranslations("Form");
  const tSchema = useTranslations("Schema");
  const tColors = useTranslations("Colors");

  const schema = getClientRegistrationSchema(tSchema);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ClientRegistrationInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ClientRegistrationInput) => {
    setStatus("loading");
    
    try {
      const result = await createClientAction(data);
      
      if (result.success) {
        console.log("Cliente criado com sucesso. Retorno da action:", result.data);
        setStatus("success");
        reset();
      } else {
        console.error("Erro ao criar cliente pela action:", result.error);
        setStatus("error");
      }
    } catch (err) {
      console.error("Erro inesperado ao chamar a Server Action:", err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardContent className="flex flex-col items-center gap-4 py-12">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-center">{tForm("successTitle")}</h2>
          <p className="text-sm text-muted-foreground text-center">
            {tForm("successMessage")}
          </p>
          <Button variant="outline" onClick={() => setStatus("idle")}>
            {tForm("newRegistration")}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>{tForm("title")}</CardTitle>
        <CardDescription>
          {tForm("description")}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">

          {/* Nome Completo */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fullName">{tForm("fullName")}</Label>
            <Input
              id="fullName"
              placeholder={tForm("fullNamePlaceholder")}
              aria-describedby="fullName-error"
              aria-invalid={!!errors.fullName}
              {...register("fullName")}
            />
            {errors.fullName && (
              <p id="fullName-error" className="text-sm text-destructive">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* CPF */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cpf">{tForm("cpf")}</Label>
            <Input
              id="cpf"
              placeholder={tForm("cpfPlaceholder")}
              maxLength={14}
              aria-describedby="cpf-error"
              aria-invalid={!!errors.cpf}
              {...register("cpf")}
            />
            {errors.cpf && (
              <p id="cpf-error" className="text-sm text-destructive">
                {errors.cpf.message}
              </p>
            )}
          </div>

          {/* E-mail */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">{tForm("email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={tForm("emailPlaceholder")}
              aria-describedby="email-error"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Cor Preferida */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="favoriteColor">{tForm("favoriteColor")}</Label>
            <Select
              onValueChange={(value) =>
                setValue("favoriteColor", value as ClientRegistrationInput["favoriteColor"], {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger
                id="favoriteColor"
                aria-describedby="favoriteColor-error"
                aria-invalid={!!errors.favoriteColor}
              >
                <SelectValue placeholder={tForm("favoriteColorPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(RainbowColor) as Array<keyof typeof RainbowColor>).map((color) => (
                  <SelectItem key={color} value={color}>
                    {tColors(color)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.favoriteColor && (
              <p id="favoriteColor-error" className="text-sm text-destructive">
                {errors.favoriteColor.message}
              </p>
            )}
          </div>

          {/* Observações */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="observations">
              {tForm("observations")} <span className="text-muted-foreground text-xs">{tForm("observationsOptional")}</span>
            </Label>
            <Textarea
              id="observations"
              placeholder={tForm("observationsPlaceholder")}
              rows={3}
              aria-describedby="observations-error"
              {...register("observations")}
            />
            {errors.observations && (
              <p id="observations-error" className="text-sm text-destructive">
                {errors.observations.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button type="submit" disabled={status === "loading"} className="w-full mt-2">
            {status === "loading" ? tForm("submitting") : tForm("submit")}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}

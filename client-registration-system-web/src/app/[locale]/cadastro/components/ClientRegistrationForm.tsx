"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { getClientRegistrationSchema, RainbowColor } from "../schemas/client.schema";
import { ClientRegistrationInput } from "../types/client.types";
import { createClientAction } from "@/server-actions/client-registration-system-api/create-client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/lib/form";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ClientRegistrationForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

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
    try {
      const result = await createClientAction(data);
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardContent className="flex flex-col items-center gap-4 py-12">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-center">{tForm("successTitle")}</h2>
          <p className="text-sm text-muted-foreground text-center">{tForm("successMessage")}</p>
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
        <CardDescription>{tForm("description")}</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-5"
          >
            {/* Nome Completo */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tForm("fullName")}</FormLabel>
                  <FormControl>
                    <Input placeholder={tForm("fullNamePlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CPF */}
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tForm("cpf")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={tForm("cpfPlaceholder")}
                      maxLength={14}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* E-mail */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tForm("email")}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={tForm("emailPlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cor Preferida */}
            <FormField
              control={form.control}
              name="favoriteColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tForm("favoriteColor")}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={tForm("favoriteColorPlaceholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(Object.keys(RainbowColor) as Array<keyof typeof RainbowColor>).map(
                        (color) => (
                          <SelectItem key={color} value={color}>
                            {tColors(color)}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Observações */}
            <FormField
              control={form.control}
              name="observations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tForm("observations")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={tForm("observationsPlaceholder")}
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{tForm("observationsOptional")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full mt-2"
            >
              {status === "loading" ? tForm("submitting") : tForm("submit")}
            </Button>

            {/* Erro geral */}
            {status === "error" && (
              <p className="text-sm text-destructive text-center">{tForm("errorMessage")}</p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";
import { formatCpf } from "@/shared/utils/formatters";

import { getClientRegistrationSchema, RainbowColor } from "../schemas/client.schema";
import { ClientRegistrationInput } from "../types/client.types";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/lib/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

interface ClientRegistrationFormFieldsProps {
  form: UseFormReturn<ClientRegistrationInput>;
}

export function ClientRegistrationFormFields({ form }: ClientRegistrationFormFieldsProps) {
  const tForm = useTranslations("Form");
  const tColors = useTranslations("Colors");

  return (
    <>
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
                value={field.value}
                onChange={(e) => {
                  const formatted = formatCpf(e.target.value);
                  field.onChange(formatted);
                }}
                name={field.name}
                onBlur={field.onBlur}
                ref={field.ref}
                disabled={field.disabled}
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
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={tForm("favoriteColorPlaceholder")}>
                    {field.value ? tColors(field.value) : tForm("favoriteColorPlaceholder")}
                  </SelectValue>
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
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormDescription>{tForm("observationsOptional")}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

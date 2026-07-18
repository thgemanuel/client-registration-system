import { z } from "zod";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

export const RainbowColor = {
  red: "red",
  orange: "orange",
  yellow: "yellow",
  green: "green",
  blue: "blue",
  indigo: "indigo",
  violet: "violet",
} as const;

export const getClientRegistrationSchema = (t: (key: string) => string) => z.object({
  fullName: z
    .string()
    .min(3, t('fullNameMin'))
    .max(150, t('fullNameMax'))
    .refine((val) => !/\d/.test(val), t('fullNameContainsNumbers'))
    .refine((val) => {
      const parts = val.trim().split(/\s+/);
      return parts.length >= 2 && parts[parts.length - 1].length >= 2;
    }, t('fullNameInvalid')),

  cpf: z
    .string()
    .min(1, t('cpfRequired'))
    .refine((val) => cpfValidator.isValid(val), t('cpfInvalid'))
    .transform(val => val.replace(/[^\d]/g, '')),

  email: z
    .string()
    .min(1, t('emailRequired'))
    .email(t('emailInvalid')),

  favoriteColor: z
    .enum(["red", "orange", "yellow", "green", "blue", "indigo", "violet"], {
      message: t('favoriteColorRequired'),
    }),

  observations: z
    .string()
    .max(500, t('observationsMax'))
    .optional(),
});

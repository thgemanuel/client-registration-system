import { z } from "zod";
import { getClientRegistrationSchema, RainbowColor } from "../schemas/client.schema";

export type ClientRegistrationInput = z.infer<ReturnType<typeof getClientRegistrationSchema>>;

export type RainbowColorKey = keyof typeof RainbowColor;

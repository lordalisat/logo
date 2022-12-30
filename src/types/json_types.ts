// @ts-check
import { z } from "zod";

export const SettingsSchema = z.discriminatedUnion("mode", [
  z.object({
    mode: z.literal(0),
    color: z.string().regex(new RegExp("/([0-9A-F]{3}){1,2}$/")),
    last_update: z.number()
  }),
  z.object({
    mode: z.literal(1),
    fades: z.tuple([
      z.string().regex(new RegExp("/([0-9A-F]{3}){1,2}$/")),
      z.number(),
      z.number(),
    ]).array().nonempty(),
    last_update: z.number()
  }),
]);

export type Settings = z.infer<typeof SettingsSchema>;
// @ts-check
import { z } from "zod";

const SingleColorSchema = z.object({
  mode: z.literal(0),
  color: z.string().regex(new RegExp("/([0-9A-F]{3}){1,2}$/")),
});

const FadeSchema = z.tuple([
  z.string().regex(new RegExp("/([0-9A-F]{3}){1,2}$/")),
  z.number(),
  z.number(),
]).array().nonempty();

const FadeColorsSchema =
  z.object({
    mode: z.literal(1),
    fades: FadeSchema,
  });

export const SettingsSchema = z.discriminatedUnion("mode", [
  SingleColorSchema, FadeColorsSchema,
]);

export type Fade = z.infer<typeof FadeSchema>;

export type Settings = z.infer<typeof SettingsSchema>;

export type CurSettings = Settings & { last_update: number };

export const modes = ["Single Color", "Fade Between Colors"] as const;

export type modesType = typeof modes[number];
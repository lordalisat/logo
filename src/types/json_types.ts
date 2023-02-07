// @ts-check
import { z } from "zod";

const SingleColorSchema = z.object({
  mode: z.literal(0),
  color: z.string().regex(new RegExp("#?([A-Fa-f0-9]{3}){1,2}")).transform((val) => val.replace('#', '')),
});

const FadeSchema = z.tuple([
  z.string().regex(new RegExp("#?([A-Fa-f0-9]{3}){1,2}")).transform((val) => val.replace('#', '')),
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

export type Settings = z.infer<typeof SettingsSchema>;
export type CurSettings = Settings & { last_update: number };

export type Fade = [[string, number, number, string], ...[string, number, number, string][]];

export const modes = ["Single Color", "Fade Between Colors"] as const;
export type modesType = typeof modes[number];

export function load_settings(settings: Settings) {
  const fades = settings.mode === 0 ? [[settings.color, 2000, 1000]] : settings.fades;

  const sameFadeTimes = settings.mode === 0 ||
    (settings.fades.every(val => val[1] === settings.fades[0][1] && val[2] === settings.fades[0][2]));

  fades.forEach((fade) => {
    fade[0] = `#${fade[0]}`;
    fade[3] = Math.random().toString(20).slice(2, 6);
  });

  return { mode: modes[settings.mode], fades, sameFadeTimes };
}

export function save_settings(mode: modesType, fades: Fade) {
  switch (mode) {
    case modes[0]:
      return { mode: 0, color: fades[0][0] }
    case modes[1]:
      return { mode: 1, fades: fades.map((fade) => [fade[0], fade[1], fade[2]]) };
  }
}
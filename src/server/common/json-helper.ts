import { env } from "env/server.mjs";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import type { Settings } from "types/json_types";

const SETTINGS_PATH = path.join(env.SETTINGS_PATH, "current.json");
const PRESETS_PATH = path.join(env.SETTINGS_PATH, "presets");

function load_defaults(): Settings {
  const curTime = new Date().getTime();
  return {mode: 0, color: "00ff11", last_update: curTime}
}

export function get_settings(): Settings {
  if (!existsSync(SETTINGS_PATH)) {
    const defaults = load_defaults();
    writeFileSync(SETTINGS_PATH, JSON.stringify(defaults));
    return defaults;
  }
  return JSON.parse(readFileSync(SETTINGS_PATH, 'utf8'));
}

export function set_settings(settings: Settings) {
  writeFileSync(SETTINGS_PATH, JSON.stringify(settings));
}

export function get_presets(): Array<string> {
  return readdirSync(PRESETS_PATH)
    .filter((file) => path.parse(file).ext === ".json")
    .map((file) => path.parse(file).name);
}

export function get_preset(name: string): Settings | undefined {
  const filePath = path.join(PRESETS_PATH, name, ".json");
  if (!existsSync(filePath)) {
    return;
  }
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

export function add_preset(name: string, preset: Settings) {
  const filePath = path.join(PRESETS_PATH, name, ".json");
  writeFileSync(filePath, JSON.stringify(preset));
}
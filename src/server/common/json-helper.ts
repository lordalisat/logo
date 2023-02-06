import { env } from "env/server.mjs";
import fs from "fs";
import path from "path";
import type { CurSettings, Settings } from "types/json_types";

const SETTINGS_FILE = path.join(env.SETTINGS_PATH, "current.json");
const PRESETS_DIR = path.join(env.SETTINGS_PATH, "presets");

function create_dirs() {
  if (!fs.existsSync(env.SETTINGS_PATH)) {
    fs.mkdirSync(env.SETTINGS_PATH);
  }
  if (!fs.existsSync(PRESETS_DIR)) {
    fs.mkdirSync(PRESETS_DIR);
  }
}

function load_defaults(): CurSettings {
  const curTime = new Date().getTime();
  const defaults: CurSettings = { mode: 0, color: "00ff11", last_update: curTime } as const;
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(defaults));
  return defaults;
}

export function get_settings(): CurSettings {
  create_dirs();
  if (!fs.existsSync(SETTINGS_FILE)) {
    return load_defaults();
  }
  return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
}

export function set_settings(settings: Settings) {
  create_dirs();
  const curTime = new Date().getTime();
  if (settings.mode === 0) {
    settings.color.replace("#", "");
  }
  else if (settings.mode === 1) {
    settings.fades.forEach((fade) => fade[0].replace("#", ""));
  }
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify({ ...settings, last_update: curTime }));
}

export function get_presets(): Array<string> {
  create_dirs();
  return fs.readdirSync(PRESETS_DIR)
    .filter((file) => path.parse(file).ext === ".json")
    .map((file) => path.parse(file).name);
}

export function get_preset(name: string): Settings | undefined {
  create_dirs();
  const filePath = path.join(PRESETS_DIR, `${name}.json`);
  if (!fs.existsSync(filePath)) {
    return;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function add_preset(name: string, preset: Settings) {
  create_dirs();
  const filePath = path.join(PRESETS_DIR, name, ".json");
  fs.writeFileSync(filePath, JSON.stringify(preset));
}
import { useReducer, useState, type Reducer } from "react";
import { type Fade, modes, type modesType } from "types/json_types";
import MultiColorPicker from "./multi-color-picker";
import SingleColorPicker from "./single-color-picker";
import FadeTimes from "./fade-times";

export type FadeAction =
  | { type: "color"; val: string; i: number }
  | { type: "duration"; val: number; i: number }
  | { type: "fadeDuration"; val: number; i: number }
  | { type: "addFade" }
  | { type: "removeFade"; i: number }
  | { type: "moveFadeUp"; i: number }
  | { type: "moveFadeDown"; i: number };

function fadeReducer(state: Fade, action: FadeAction): Fade {
  switch (action.type) {
    case "color":
      return state.map((fade, idx) =>
        idx === action.i ? [action.val, fade[1], fade[2]] : [...fade]
      ) as Fade;
    case "duration":
      return state.map((fade, idx) =>
        idx === action.i ? [fade[0], action.val, fade[2]] : [...fade]
      ) as Fade;
    case "fadeDuration":
      return state.map((fade, idx) =>
        idx === action.i ? [fade[0], fade[1], action.val] : [...fade]
      ) as Fade;
    case "addFade":
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return [...state, state.at(-1)!];
    case "removeFade": {
      const newState = state.filter((_val, idx) => idx !== action.i);
      return newState.length > 0
        ? ([...newState] as Fade)
        : [["#FFFFFF", 2000, 1000]];
    }
    case "moveFadeUp": {
      const newState = [...state];
      if (action.i > 0 && action.i <= state.length - 1) {
        [newState[action.i], newState[action.i - 1]] = [
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          state[action.i - 1]!,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          state[action.i]!,
        ];
      }
      return [...newState] as Fade;
    }
    case "moveFadeDown": {
      const newState = [...state];
      if (action.i >= 0 && action.i < state.length - 1) {
        [newState[action.i], newState[action.i + 1]] = [
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          state[action.i + 1]!,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          state[action.i]!,
        ];
      }
      return [...newState] as Fade;
    }
  }
}

export default function MainContent({
  initMode,
  initFades,
}: {
  initMode: modesType;
  initFades: Fade;
  initSameFadeTimes: boolean;
}) {
  const [mode, setMode] = useState<modesType>(initMode);
  const [fades, setFades] = useReducer<Reducer<Fade, FadeAction>>(
    fadeReducer,
    initFades
  );

  function save() {
    switch (mode) {
      case modes[0]:
        fetch("/api/json", {
          method: "POST",
          body: JSON.stringify({ mode: 0, color: fades[0][0] }),
        });
        break;
      case modes[1]:
        fetch("/api/json", {
          method: "POST",
          body: JSON.stringify({ mode: 1, fades: fades }),
        });
    }
  }

  return (
    <>
      <div className="flex w-full max-w-md flex-grow flex-col items-center gap-2 overflow-y-scroll px-4 scrollbar-thin scrollbar-track-gray-50 scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full dark:scrollbar-track-gray-600/[0.16] dark:scrollbar-thumb-gray-700/50">
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Mode
        </label>
        <select
          id="mode-select"
          value={mode}
          onChange={(e) => setMode(e.target.value as modesType)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          {modes.map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>
        {
          {
            [modes[0]]: (
              <SingleColorPicker
                color={fades[0][0]}
                onChange={(color) =>
                  setFades({ type: "color", val: color, i: 0 })
                }
              />
            ),
            [modes[1]]: (
              <>
                {fades.map((fade, i) => {
                  return (
                    <MultiColorPicker
                      key={i}
                      fade={fade}
                      dispatch={setFades}
                      i={i}
                      fadeLength={fades.length}
                    />
                  );
                })}
                <button
                  className="mb-2 mr-2 w-36 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 hover:bg-blue-800 dark:bg-blue-600 dark:focus:ring-blue-800 dark:hover:bg-blue-700"
                  onClick={() => setFades({ type: "addFade" })}
                >
                  Add Fade
                </button>
              </>
            ),
          }[mode]
        }
      </div>

      <div className="flex flex-row flex-wrap justify-center">
        <button className="mb-2 mr-2 w-36 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:focus:ring-gray-700 dark:hover:bg-gray-700 dark:hover:text-white">
          Load Preset
        </button>
        <button className="mb-2 mr-2 w-36 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:focus:ring-gray-700 dark:hover:bg-gray-700 dark:hover:text-white">
          Save Preset
        </button>
        <button
          className="mb-2 mr-2 w-36 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 hover:bg-blue-800 dark:bg-blue-600 dark:focus:ring-blue-800 dark:hover:bg-blue-700"
          onClick={save}
        >
          Save
        </button>
      </div>
    </>
  );
}

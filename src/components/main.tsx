import { useReducer, useState, type Reducer } from "react";
import { type Fade, modes, type modesType } from "types/json_types";
import MultiColorPicker from "./multi-color-picker";
import FooterButtons from "./footer-buttons";
import SingleColorPicker from "./single-color-picker";
import FadeTimes from "./fade-times";

export type FadeAction = {type: "color", val: string, i: number} | {type: "duration", val: number, i: number} | {type: "fadeDuration", val: number, i: number} | {type: "sameDuration", val: number} | {type: "sameFadeDuration", val: number}

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
    case "sameDuration":
      return state.map((fade) =>
      [fade[0], action.val, fade[2]]
    ) as Fade;
    case "sameFadeDuration":
      return state.map((fade) =>
      [fade[0], fade[1], action.val]
    ) as Fade;
  }
}

export default function MainContent() {
  const [mode, setMode] = useState<modesType>("Single Color");
  const [color, setColor] = useState<string>("#FFFFFF");
  const [fades, setFades] = useReducer<Reducer<Fade, FadeAction>>(fadeReducer, [["#FFFFFF", 2000, 1000], ["#FFFFFF", 2000, 1000]])
  const [sameFadeTimes, setSameFadeTimes] = useState<boolean>(false);

  function toggleSameFadeTimes() {
    setSameFadeTimes((prev) => !prev);
  }

  return <>
    <div className="flex-grow w-full overflow-y-scroll max-w-md flex flex-col items-center gap-2 px-4 scrollbar-thin scrollbar-track-gray-50 scrollbar-thumb-gray-300 dark:scrollbar-track-gray-600/[0.16] dark:scrollbar-thumb-gray-700/50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        Mode
      </label>
      <select
        id="mode-select"
        value={mode}
        onChange={e => setMode(e.target.value as modesType)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {modes.map((mode) => 
          <option key={mode} value={mode}>{mode}</option>
        )}
      </select>
      {
        {
          [modes[0]]:<SingleColorPicker
              color={color}
              onChange={setColor}
            />,
          [modes[1]]:
            (
              <>
                <div className="flex items-center mb-4">
                  <input id="sameFadeTimes" type="checkbox" checked={sameFadeTimes} onChange={toggleSameFadeTimes} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="sameFadeTimes" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Same Fade Times for all Colors</label>
              </div>
                {
                (sameFadeTimes && <div className="w-full flex flex-col p-2 gap-2 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <FadeTimes 
                  fade={fades[0]}
                  dispatch={setFades}
                  i={0}
                  sameFadeTimes={sameFadeTimes} /></div>)
                }
                {
                  fades.map((fade, i) => {
                    return (
                      <MultiColorPicker
                        key={i}
                        fade={fade}
                        dispatch={setFades}
                        i={i}
                        sameFadeTimes={sameFadeTimes}
                    />
                    )
                  })
                }
              </>
            )
        }[mode]
      }
    </div>
    <FooterButtons />
  </>
}
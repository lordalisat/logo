import { useEffect, useState } from "react";
import { modes, type modesType } from "types/json_types";
import SingleColorPicker from "./color-picker";
import FooterButtons from "./footer-buttons";

export default function MainContent() {
  const [mode, setMode] = useState<modesType>(modes["Single Color"]);
  const [color, setColor] = useState("#FFFFFF");
  const [color2, setColor2] = useState("#FFFFFF")

  useEffect(() => console.log(mode), [mode])

  return <>
    <form className="flex-grow overflow-y-auto w-full max-w-md flex flex-col items-center gap-2">
      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        Mode
      </label>
      <select
        id="mode-select"
        value={mode}
        onChange={e => setMode(parseInt(e.target.value) as modesType)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {Object.entries(modes).map((mode) => 
          <option key={mode[0]} value={mode[1]}>{mode[0]}</option>
        )}
      </select>
      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        Color
      </label>
      {
        {
          0:
            <SingleColorPicker
              id="color-picker"
              color={color}
              onChange={setColor} />,
          1:
            <SingleColorPicker
              id="color-picker"
              color={color2}
              onChange={setColor2} />
        }[mode]
      }
    </form>
    <FooterButtons />
  </>
}
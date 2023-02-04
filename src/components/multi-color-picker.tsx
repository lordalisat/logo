import React, { type Dispatch, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import type { Fade } from "types/json_types";
import useDebouncy from "use-debouncy/lib/effect";
import FadeTimes from "./fade-times";
import type { FadeAction } from "./main";

const MultiColorPicker = ({
  fade,
  dispatch,
  i,
  sameFadeTimes,
}: {
  fade: Fade[number];
  dispatch: Dispatch<FadeAction>;
  i: number;
  sameFadeTimes: boolean;
}) => {
  const [value, setValue] = useState(fade[0]);

  useDebouncy(() => dispatch({ type: "color", val: value, i: i }), 200, [
    value,
  ]);

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border border-gray-200 bg-white p-2 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="group flex w-full flex-col items-center gap-2">
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Color
        </label>
        <div tabIndex={0} className="flex w-full">
          <span
            className="inline-flex w-10 items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-sm text-gray-900 dark:border-gray-600 dark:text-gray-400"
            style={{ backgroundColor: value }}
          ></span>
          <HexColorInput
            className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-300 bg-gray-50 p-2.5 text-sm uppercase text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            color={value}
            onChange={setValue}
            prefixed={true}
          />
        </div>
        <div id="picker" className="hidden group-focus-within:block">
          <HexColorPicker color={value} onChange={setValue} />
        </div>
      </div>
      {!sameFadeTimes && (
        <FadeTimes
          fade={fade}
          dispatch={dispatch}
          i={i}
          sameFadeTimes={sameFadeTimes}
        />
      )}
    </div>
  );
};

export default MultiColorPicker;

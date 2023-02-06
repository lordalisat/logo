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
  fadeLength,
}: {
  fade: Fade[number];
  dispatch: Dispatch<FadeAction>;
  i: number;
  sameFadeTimes: boolean;
  fadeLength: number;
}) => {
  const [value, setValue] = useState(fade[0]);

  useDebouncy(() => dispatch({ type: "color", val: value, i: i }), 200, [
    value,
  ]);

  return (
    <div className="flex w-full flex-row gap-2 rounded-lg border border-gray-200 bg-white p-2 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex w-full flex-col gap-2">
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
      <div className="flex flex-col gap-1 justify-center">
        {i > 0 && (<button
          className="p-2 text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={() => dispatch({ type: "moveFadeUp", i: i })}
        >
          <svg
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            ></path>
          </svg>
        </button>)}
        <button
          className="p-2 text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={() => dispatch({ type: "removeFade", i: i })}
        >
          <svg
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19.5 12h-15"
            ></path>
          </svg>
        </button>
        {i < fadeLength - 1 && (<button
          className="p-2 text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={() => dispatch({ type: "moveFadeDown", i: i })}
        >
          <svg
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            ></path>
          </svg>
        </button>)}
      </div>
    </div>
  );
};

export default MultiColorPicker;

import React, { type Dispatch, useState } from "react";
import type { Fade } from "types/json_types";
import useDebouncy from "use-debouncy/lib/effect";
import type { FadeAction } from "./main";

const FadeTimes = ({
  fade,
  dispatch,
  i,
}: {
  fade: Fade[number];
  dispatch: Dispatch<FadeAction>;
  i: number;
}) => {
  const [duration, setDuration] = useState(fade[1]);
  const [fadeDuration, setFadeDuration] = useState(fade[2]);

  useDebouncy(
    () => {
      dispatch({ type: "fadeDuration", val: fadeDuration, i: i });
    },
    200,
    [fadeDuration]
  );

  useDebouncy(
    () => {
      dispatch({ type: "duration", val: duration, i: i });
    },
    200,
    [duration]
  );

  return (
    <>
      <div className="flex w-full gap-2">
        <div className="flex flex-grow flex-col items-center gap-2">
          <label
            htmlFor={`duration${i}`}
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Duration
          </label>
          <input
            id={`duration${i}`}
            type="number"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
            required
          />
        </div>
        <div className="flex flex-grow flex-col items-center gap-2">
          <label
            htmlFor={`fadeDuration${i}`}
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Fade Duration
          </label>
          <input
            id={`fadeDuration${i}`}
            type="number"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={fadeDuration}
            onChange={(e) => setFadeDuration(parseInt(e.target.value) || 0)}
            required
          />
        </div>
      </div>
    </>
  );
};

export default FadeTimes;

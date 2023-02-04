import React, { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import type { ColorPickerBaseProps } from "react-colorful/dist/types";
import useDebouncy from "use-debouncy/lib/effect";

const SingleColorPicker = ({
  color,
  onChange,
}: ColorPickerBaseProps<string>) => {
  const [value, setValue] = useState(color);

  useDebouncy(() => onChange(value), 200, [value]);

  return (
    <div className="flex w-full flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-2 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        Color
      </label>
      <div tabIndex={0} className="flex w-full">
        <span
          className="inline-flex w-10 items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-sm text-gray-900 dark:border-gray-600 dark:text-gray-400"
          style={{ backgroundColor: color }}
        ></span>
        <HexColorInput
          className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-300 bg-gray-50 p-2.5 text-sm uppercase text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          color={color}
          onChange={onChange}
          prefixed={true}
        />
      </div>
      <HexColorPicker color={color} onChange={setValue} />
    </div>
  );
};

export default SingleColorPicker;

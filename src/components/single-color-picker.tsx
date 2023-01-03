import React, { useState } from 'react'
import { HexColorInput, HexColorPicker } from "react-colorful";
import type { ColorPickerBaseProps } from 'react-colorful/dist/types';
import useDebouncy from 'use-debouncy/lib/effect';

const SingleColorPicker = ({ color, onChange }: ColorPickerBaseProps<string>) => {
  const [value, setValue] = useState(color);

  useDebouncy(() => onChange(value), 200, [value]);

  return (
    <div className="w-full p-2 flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        Color
      </label>
      <div tabIndex={0} className='flex w-full'>
        <span className="inline-flex w-10 items-center px-3 text-sm text-gray-900 rounded-l-md border border-r-0 border-gray-300 dark:text-gray-400 dark:border-gray-600"
        style={{backgroundColor: color}}>
        </span>
        <HexColorInput
          className='uppercase rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          color={color}
          onChange={onChange}
          prefixed={true}
        />
      </div>
      <HexColorPicker color={color} onChange={setValue} />
    </div>
  )
}

export default SingleColorPicker;
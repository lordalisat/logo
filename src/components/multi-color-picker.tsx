import React, { useState } from 'react'
import { HexColorInput, HexColorPicker } from "react-colorful";
import useDebouncy from 'use-debouncy/lib/effect';

const MultiColorPicker = ({ color, onChange, i }: {color: string, onChange: (newColor: string, i: number) => void, i: number}) => {
  const [value, setValue] = useState(color);

  useDebouncy(() => onChange(value, i), 300, [value]);

  return (
    <>
      <div className='group w-full flex flex-col items-center gap-2'>
        <div tabIndex={0} className='flex w-full'>
          <span className="inline-flex w-10 items-center px-3 text-sm text-gray-900 rounded-l-md border border-r-0 border-gray-300 dark:text-gray-400 dark:border-gray-600"
          style={{backgroundColor: value}}>
          </span>
          <HexColorInput
            className='uppercase rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            color={value}
            onChange={setValue}
            prefixed={true}
          />
        </div>
        <div id='picker' className='hidden group-focus-within:block'>
          <HexColorPicker color={value} onChange={setValue} />
        </div>
      </div>
    </>
  )
}

export default MultiColorPicker;
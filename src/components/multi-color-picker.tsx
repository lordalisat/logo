import React, { type Dispatch, useState } from 'react'
import { HexColorInput, HexColorPicker } from "react-colorful";
import type { Fade } from 'types/json_types';
import useDebouncy from 'use-debouncy/lib/effect';
import FadeTimes from './fade-times';
import type { FadeAction } from './main';

const MultiColorPicker = ({ fade, dispatch, i, sameFadeTimes }: {fade: Fade[number], dispatch: Dispatch<FadeAction>, i: number, sameFadeTimes: boolean}) => {
  const [value, setValue] = useState(fade[0]);

  useDebouncy(() => dispatch({ type: "color", val: value, i: i }), 200, [value]);

  return (
    <div className="w-full p-2 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
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
      {
        (
          !sameFadeTimes && <FadeTimes
            fade={fade}
            dispatch={dispatch}
            i={i}
            sameFadeTimes={sameFadeTimes}
          />
        )
      }
    </div>
  )
}

export default MultiColorPicker;
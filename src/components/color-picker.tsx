import React from 'react'
import { HexColorInput, HexColorPicker } from "react-colorful";
import type { ColorPickerBaseProps } from 'react-colorful/dist/types';

const MyPicker = ({ color, onChange }: ColorPickerBaseProps<string>) => {
  return (
    <>
      <HexColorInput
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        color={color}
        onChange={onChange} />
      <HexColorPicker color={color} onChange={onChange} />
    </>
  )
}

export default MyPicker;
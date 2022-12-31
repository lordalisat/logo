import React from 'react'
import { HexColorInput, HexColorPicker } from "react-colorful";
import type { ColorPickerBaseProps } from 'react-colorful/dist/types';

const MyPicker = ({ color, onChange }: ColorPickerBaseProps<string>) => {
  return (
    <>
      <HexColorInput color={color} onChange={onChange} />
      <HexColorPicker color={color} onChange={onChange} />
    </>
  )
}

export default MyPicker;
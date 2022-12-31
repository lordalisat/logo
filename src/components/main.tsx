import { useState } from "react";
import ColorPicker from "./color-picker";
import FooterButtons from "./footer-buttons";

export default function MainContent() {
  const [color, setColor] = useState("#FFFFFF")

  return <>
    <div className="flex-grow overflow-y-auto overflow-x-hidden">
      <ColorPicker
        color={color}
        onChange={ setColor } />
    </div>
    <FooterButtons />
  </>
}
import ColorPicker from "./color-picker";
import FooterButtons from "./footer-buttons";

export default function MainContent() {
  return <>
    <div className="flex-grow overflow-y-auto">
      <ColorPicker />
    </div>
    <FooterButtons />
  </>
}
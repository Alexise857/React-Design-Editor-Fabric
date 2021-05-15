import { useState } from "react"
import { useCanvasContext } from "@/hooks"
import { TwitterPicker } from "react-color"

function MenuObject() {
  const { activeObject, canvas } = useCanvasContext()
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [options, setOptions] = useState({ fill: "#333333" })

  const popover: React.CSSProperties = {
    position: "absolute",
    zIndex: 2,
  }
  const cover: React.CSSProperties = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  }

  const handleChange = (color: any, event: any) => {
    setOptions({ ...options, fill: color.hex })
    if (activeObject) {
      activeObject.set("fill", color.hex)
      canvas?.requestRenderAll()
    }
  }
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  }

  const handleClose = () => {
    setDisplayColorPicker(false)
  }
  return (
    <div>
      <div
        style={{ height: "36px", width: "36px", background: `${options.fill}` }}
        onClick={() => handleClick()}
      ></div>

      {displayColorPicker ? (
        <div style={{ ...popover }}>
          <div style={cover} onClick={handleClose} />
          <TwitterPicker onChange={handleChange} />
        </div>
      ) : null}
    </div>
  )
}

export default MenuObject

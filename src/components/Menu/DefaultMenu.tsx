import { useState, CSSProperties, useEffect } from "react"
import { useCoreHandler } from "../Canvas/handlers"
import { TwitterPicker } from "react-color"
import emptyColorPlaceholder from "@/assets/images/base-color-picker.png"
import { useCanvasContext } from "../Canvas/hooks"

function DefaultObject() {
  const [dropdown, setDropdown] = useState({
    displayColorPicker: false,
  })
  const { setCanvasBackgroundColor } = useCoreHandler()
  const { canvas } = useCanvasContext()
  const [options, setOptions] = useState({
    backgroundColor: "#ffffff",
  })

  useEffect(() => {
    const backgroundColor = canvas?.backgroundColor
      ? (canvas.backgroundColor as string)
      : "#ffffff"

    updateOptions("backgroundColor", backgroundColor)
  }, [canvas])

  const updateOptions = (key: string, value: string) => {
    setOptions({ ...options, [key]: value })
  }

  const handleClick = () => {
    setDropdown({
      ...dropdown,
      displayColorPicker: !dropdown.displayColorPicker,
    })
  }
  const handleClose = () => {
    setDropdown({ ...dropdown, displayColorPicker: false })
  }

  const popover: CSSProperties = {
    marginTop: "16px",
    position: "absolute",
    zIndex: 2,
  }
  const cover: CSSProperties = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  }

  const onColorChange = (color: any) => {
    setCanvasBackgroundColor(color.hex)
    setOptions({ ...options, backgroundColor: color.hex })
  }
  return (
    <div
      style={{
        padding: "0 1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
      }}
    >
      <div style={{ position: "relative" }}>
        <div style={{ cursor: "pointer" }} onClick={handleClick}>
          {options.backgroundColor === "#ffffff" ? (
            <img
              style={{ height: "30px", display: "flex" }}
              src={emptyColorPlaceholder}
              alt="color picker"
            />
          ) : (
            <div
              style={{
                cursor: "pointer",
                position: "relative",
                height: "30px",
                width: "30px",
                background: `${options.backgroundColor}`,
                boxShadow: "inset 0 0 0 1px rgb(57 76 96 / 15%)",
                borderRadius: "2px",
              }}
            />
          )}
        </div>

        {dropdown.displayColorPicker ? (
          <div style={popover}>
            <div style={cover} onClick={handleClose} />
            <TwitterPicker
              color={options.backgroundColor}
              onChange={onColorChange}
            />
          </div>
        ) : null}
      </div>
      <div>
        <CopyStyleIcon />
      </div>
    </div>
  )
}

function CopyStyleIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3.5H5a.5.5 0 0 0-.5.5v1.5A.5.5 0 0 0 5 6h11a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5zM5 2a2 2 0 0 0-2 2v1.5a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-.25h.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-5.75a2.25 2.25 0 0 0-2.25 2.25v1.563A2 2 0 0 0 9 15v5a2 2 0 0 0 2 2h.5a2 2 0 0 0 2-2v-5a2 2 0 0 0-1.5-1.937V11.5a.75.75 0 0 1 .75-.75h5.75a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25h-.515A2 2 0 0 0 16 2H5zm7 13a.5.5 0 0 0-.5-.5H11a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h.5a.5.5 0 0 0 .5-.5v-5z"
        fill="currentColor"
      ></path>
    </svg>
  )
}
export default DefaultObject

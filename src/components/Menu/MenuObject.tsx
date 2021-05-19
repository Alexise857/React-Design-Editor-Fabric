import { useEffect, useState } from "react"
import { useCanvasContext } from "@components/Canvas/hooks"
import { TwitterPicker } from "react-color"
import styled from "styled-components"
import CommonMenu from "./CommonMenu"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;
  padding: 0 1rem;
  position: relative;
  height: 48px;
`
function MenuObject() {
  const { activeObject, canvas } = useCanvasContext()
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [options, setOptions] = useState({
    fill: "#333333",
    objectType: "single",
  })

  const popover: React.CSSProperties = {
    marginTop: "16px",
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
  const updateOptions = (values: any) => {
    setOptions(values)
  }
  useEffect(() => {
    if (activeObject) {
      if (activeObject?.groupType === "path") {
        const activeGroup = activeObject._objects
        if (activeGroup && activeGroup[0]) {
          updateOptions({
            objectType: "group",
            fill: activeGroup[0].fill ? activeGroup[0].fill : "#333333",
          })
        }
      } else {
        updateOptions({
          objectType: "single",
          fill: activeObject.fill ? activeObject.fill : "#333333",
        })
      }
    }
  }, [activeObject])

  const handleChange = (color: any) => {
    setOptions({ ...options, fill: color.hex })
    if (activeObject && options.objectType === "single") {
      activeObject.set("fill", color.hex)
      canvas?.requestRenderAll()
    } else {
      if (activeObject?._objects) {
        activeObject?._objects.forEach((object) => {
          object.set("fill", color.hex)
        })
        canvas?.requestRenderAll()
      }
    }
  }
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  }

  const handleClose = () => {
    setDisplayColorPicker(false)
  }
  return (
    <Container>
      <div>
        <div
          style={{
            cursor: "pointer",
            position: "relative",
            height: "30px",
            width: "30px",
            background: `${options.fill}`,
            boxShadow: "inset 0 0 0 1px rgb(57 76 96 / 15%)",
            borderRadius: "2px",
          }}
          onClick={() => handleClick()}
        ></div>

        {displayColorPicker ? (
          <div style={{ ...popover }}>
            <div style={cover} onClick={handleClose} />
            <TwitterPicker onChange={handleChange} />
          </div>
        ) : null}
      </div>
      <CommonMenu />
    </Container>
  )
}

export default MenuObject

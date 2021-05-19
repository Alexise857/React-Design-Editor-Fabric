import { useState, useEffect } from "react"
import { useCoreHandler } from "@components/Canvas/handlers"
import {
  Menu,
  MenuButton,
  MenuList,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react"
import { useCanvasContext } from "../Canvas/hooks"

function CommonMenu() {
  const { activeObject } = useCanvasContext()
  const { cloneOject, updateObject, deleteObject } = useCoreHandler()
  const [options, setOptions] = useState({
    fontFamily: "Select a font",
    fill: "#000",
    fontSize: 0,
    opacity: 1,
    fontWeight: "normal",
    fontStyle: "normal",
    textAlign: "center",
  })

  useEffect(() => {
    //@ts-ignore
    const fontFamily = activeObject.fontFamily
    //@ts-ignore
    const fill = activeObject.fill
    //@ts-ignore
    const fontSize = activeObject.fontSize
    //@ts-ignore
    const opacity = activeObject.opacity
    //@ts-ignore
    const fontWeight = activeObject.fontWeight
    //@ts-ignore
    const fontStyle = activeObject.fontStyle
    //@ts-ignore
    const textAlign = activeObject.textAlign

    updateOptions({
      fontFamily,
      fill,
      fontSize,
      opacity,
      fontWeight,
      fontStyle,
      textAlign,
    })
  }, [activeObject])

  const handleChangeOption = (key: string, value: any) => {
    updateObject(key, value)
    updateOptions({ [key]: value })
  }

  const updateOptions = (values: any) => {
    setOptions({ ...options, ...values })
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "0.8rem",
      }}
    >
      <Menu>
        <MenuButton>
          <TransparencyIcon />
        </MenuButton>
        <MenuList marginTop="2">
          <div style={{ margin: "0.5rem 1.5rem" }}>
            <Slider
              aria-label="slider-ex-1"
              defaultValue={100}
              value={options.opacity * 100}
              onChange={(val) => handleChangeOption("opacity", val / 100)}
              colorScheme="gray"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb
                boxSize={4}
                style={{
                  background: "#333",
                  border: "1.8px solid #fff",
                }}
              />
            </Slider>
          </div>
        </MenuList>
      </Menu>
      <div onClick={cloneOject}>
        <DuplicateObjectIcon />
      </div>
      <div onClick={deleteObject}>
        <RemoveObjectIcon />
      </div>
    </div>
  )
}

export default CommonMenu

function TransparencyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g fill="currentColor" fillRule="evenodd">
        <path d="M3 2h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"></path>
        <path
          d="M11 2h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"
          opacity=".45"
        ></path>
        <path
          d="M19 2h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"
          opacity=".15"
        ></path>
        <path
          d="M7 6h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"
          opacity=".7"
        ></path>
        <path
          d="M15 6h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"
          opacity=".3"
        ></path>
      </g>
    </svg>
  )
}

function RemoveObjectIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M8 5a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3h4.25a.75.75 0 1 1 0 1.5H19V18a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V6.5H3.75a.75.75 0 0 1 0-1.5H8zM6.5 6.5V18c0 .83.67 1.5 1.5 1.5h8c.83 0 1.5-.67 1.5-1.5V6.5h-11zm3-1.5h5c0-.83-.67-1.5-1.5-1.5h-2c-.83 0-1.5.67-1.5 1.5zm-.25 4h1.5v8h-1.5V9zm4 0h1.5v8h-1.5V9z"
      ></path>
    </svg>
  )
}

function DuplicateObjectIcon() {
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
        d="M5 3h8a2 2 0 0 1 2 2v.5h-1.5V5a.5.5 0 0 0-.5-.5H5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h2.5V17H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm6 5.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V9a.5.5 0 0 0-.5-.5h-8zM19 7h-8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
        fill="currentColor"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 11a.75.75 0 0 0-.75.75v1.5h-1.5a.75.75 0 0 0 0 1.5h1.5v1.5a.75.75 0 0 0 1.5 0v-1.5h1.5a.75.75 0 0 0 0-1.5h-1.5v-1.5A.75.75 0 0 0 15 11z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

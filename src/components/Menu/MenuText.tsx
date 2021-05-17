import { useCallback, useEffect, useState } from "react"
import { useCanvasContext } from "@components/Canvas/hooks"
import styled from "styled-components"
import { TwitterPicker } from "react-color"
import {
  Menu,
  MenuButton,
  MenuList,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  ButtonGroup,
  Box,
  MenuItem,
} from "@chakra-ui/react"
import { fontsList } from "@/constants/fonts"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;
  padding: 0 1rem;
  position: relative;
  height: 48px;
`

function MenuText() {
  const { activeObject, canvas } = useCanvasContext()
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [options, setOptions] = useState({
    fontFamily: "Select a font",
    fill: "#000",
    fontSize: 0,
  })

  useEffect(() => {
    //@ts-ignore
    const fontFamily = activeObject.fontFamily
    //@ts-ignore
    const fill = activeObject.fill
    //@ts-ignore
    const fontSize = activeObject.fontSize
    updateOptions({ fontFamily, fill, fontSize })
  }, [activeObject])

  const updateOptions = (values: any) => {
    setOptions({ ...options, ...values })
  }
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  }

  const handleClose = () => {
    setDisplayColorPicker(false)
  }

  const handleChangeOption = (key: string, value: any) => {
    setProperty(key, value)
    updateOptions({ [key]: value })
  }

  const setProperty = useCallback(
    (key, value) => {
      activeObject?.set(key, value)
      canvas?.requestRenderAll()
    },
    [activeObject]
  )

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

  return (
    <Container>
      <ButtonGroup spacing={2}>
        <Menu arrowPadding={10}>
          <MenuButton
            textAlign="left"
            border="1px solid rgba(57,76,96,.15)"
            fontFamily="Rubik"
            fontWeight="400"
            width="220px"
            padding="0.2rem 0.6rem"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 20px",
                alignItems: "center",
              }}
            >
              <div>{options.fontFamily}</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <i className="material-icons">expand_more</i>
              </div>
            </div>
          </MenuButton>
          <MenuList>
            {fontsList.map((font) => (
              <MenuItem
                fontFamily={`${font}`}
                key={font}
                onClick={() => handleChangeOption("fontFamily", font)}
              >
                {font}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <ButtonGroup spacing={0}>
          <Box
            as="button"
            onClick={() => handleChangeOption("fontSize", --options.fontSize)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 400,
              fontFamily: "Rubik",
              border: "1px solid rgba(57,76,96,.15)",
              width: "30px",
            }}
          >
            -
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 400,
              fontFamily: "Rubik",
              borderTop: "1px solid rgba(57,76,96,.15)",
              borderBottom: "1px solid rgba(57,76,96,.15)",
              width: "40px",
            }}
          >
            {options.fontSize}
          </Box>
          <Box
            as="button"
            onClick={() => handleChangeOption("fontSize", ++options.fontSize)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 400,
              fontFamily: "Rubik",
              border: "1px solid rgba(57,76,96,.15)",
              width: "30px",
            }}
          >
            +
          </Box>
        </ButtonGroup>
        <Box>
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
                <TwitterPicker
                  onChange={(color) => handleChangeOption("fill", color.hex)}
                />
              </div>
            ) : null}
          </div>
        </Box>
      </ButtonGroup>
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
                defaultValue={30}
                onChange={(val) => console.log(val)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </div>
          </MenuList>
        </Menu>
        <div>
          <DuplicateObjectIcon />
        </div>
        <div>
          <RemoveObjectIcon />
        </div>
      </div>
    </Container>
  )
}

function FontColorIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        d="M11 2L5.5 16h2.25l1.12-3h6.25l1.12 3h2.25L13 2h-2zm-1.38 9L12 4.67 14.38 11H9.62z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

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

export default MenuText

import { useCallback, useEffect, useState } from "react"
import { useCanvasContext } from "@components/Canvas/hooks"
import styled from "styled-components"
import { TwitterPicker } from "react-color"
import CommonMenu from "./CommonMenu"
import {
  Menu,
  MenuButton,
  MenuList,
  ButtonGroup,
  Box,
  MenuItem,
  Stack,
} from "@chakra-ui/react"
import { fontsList } from "@/constants/fonts"
import { useCoreHandler } from "../Canvas/handlers"

const IconContainer = styled.div`
  cursor: pointer;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;
  padding: 0 1rem;
  position: relative;
  height: 48px;
`

const textOptions = ["left", "center", "right"]

function MenuText() {
  const { activeObject, canvas } = useCanvasContext()
  const { updateObject } = useCoreHandler()
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
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
    updateObject(key, value)
    updateOptions({ [key]: value })
  }

  const changeTextAlign = (currentValue: string) => {
    const findCurrentIndex = textOptions.findIndex((to) => to === currentValue)
    const nextValue = textOptions[(findCurrentIndex + 1) % textOptions.length]
    handleChangeOption("textAlign", nextValue)
  }

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

        <Stack spacing={2} direction="row" align="center">
          <Box>
            <div>
              <div
                style={{
                  cursor: "pointer",
                  position: "relative",
                  height: "24px",
                  width: "24px",
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
          <div
            style={{
              opacity: options.fontWeight !== "bold" ? "0.5" : "1",
              cursor: "pointer",
            }}
            onClick={() =>
              handleChangeOption(
                "fontWeight",
                options.fontWeight == "normal" ? "bold" : "normal"
              )
            }
          >
            <BoldIcon />
          </div>

          <div
            style={{ cursor: "pointer" }}
            onClick={() =>
              handleChangeOption(
                "fontStyle",
                options.fontStyle == "normal" ? "italic" : "normal"
              )
            }
          >
            <ItalicIcon />
          </div>

          <div
            style={{
              width: "1px",
              height: "24px",
              background: "rgba(57,76,96,.15)",
            }}
          />

          <div
            onClick={() => changeTextAlign(options.textAlign)}
            style={{ cursor: "pointer" }}
          >
            {options.textAlign === "center" ? (
              <TextAlignCenterIcon />
            ) : options.textAlign === "left" ? (
              <TextAlignLeftIcon />
            ) : options.textAlign === "right" ? (
              <TextAlignRightIcon />
            ) : null}
          </div>
        </Stack>
      </ButtonGroup>
      <CommonMenu />
    </Container>
  )
}

const TextIcons = [TextAlignRightIcon, TextAlignLeftIcon, TextAlignCenterIcon]

function TextAlignRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M20.25 5.25a.75.75 0 1 1 0 1.5H3.75a.75.75 0 0 1 0-1.5h16.5zm0 4a.75.75 0 1 1 0 1.5h-8.5a.75.75 0 1 1 0-1.5h8.5zm0 4a.75.75 0 1 1 0 1.5H3.75a.75.75 0 1 1 0-1.5h16.5zm0 4a.75.75 0 1 1 0 1.5h-8.5a.75.75 0 1 1 0-1.5h8.5z"
      ></path>
    </svg>
  )
}

function TextAlignLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <defs>
        <path
          id="_310417673__a"
          d="M3.75 5.25h16.5a.75.75 0 1 1 0 1.5H3.75a.75.75 0 0 1 0-1.5zm0 4h8.5a.75.75 0 1 1 0 1.5h-8.5a.75.75 0 1 1 0-1.5zm0 4h16.5a.75.75 0 1 1 0 1.5H3.75a.75.75 0 1 1 0-1.5zm0 4h8.5a.75.75 0 1 1 0 1.5h-8.5a.75.75 0 1 1 0-1.5z"
        ></path>
      </defs>
      <use
        fill="currentColor"
        xlinkHref="#_310417673__a"
        fill-rule="evenodd"
      ></use>
    </svg>
  )
}
function TextAlignCenterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M3.75 5.25h16.5a.75.75 0 1 1 0 1.5H3.75a.75.75 0 0 1 0-1.5zm4 4h8.5a.75.75 0 1 1 0 1.5h-8.5a.75.75 0 1 1 0-1.5zm-4 4h16.5a.75.75 0 1 1 0 1.5H3.75a.75.75 0 1 1 0-1.5zm4 4h8.5a.75.75 0 1 1 0 1.5h-8.5a.75.75 0 1 1 0-1.5z"
      ></path>
    </svg>
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

function BoldIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="black"
        fillRule="evenodd"
        opacity="currentColor"
        d="M7.08 4.72h4.44c2.03 0 3.5.3 4.41.87.92.57 1.37 1.49 1.37 2.75 0 .85-.2 1.55-.6 2.1-.4.54-.93.87-1.6.98v.1c.91.2 1.56.58 1.96 1.13.4.56.6 1.3.6 2.2 0 1.31-.47 2.33-1.4 3.06A6.1 6.1 0 0 1 12.41 19H7.08V4.72zm3.03 5.66h1.75c.82 0 1.42-.13 1.79-.38.36-.26.55-.68.55-1.26 0-.55-.2-.94-.6-1.18a3.86 3.86 0 0 0-1.9-.36h-1.6v3.18zm0 2.4v3.72h1.97c.83 0 1.45-.16 1.84-.48.4-.32.6-.8.6-1.46 0-1.19-.85-1.78-2.54-1.78h-1.87z"
      ></path>
    </svg>
  )
}

function ItalicIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="#0E1318"
        fillRule="evenodd"
        d="M14.73 6.5l-3.67 11H14l-.3 1.5H6l.3-1.5h2.81l3.68-11H10l.3-1.5H18l-.3 1.5h-2.97z"
      ></path>
    </svg>
  )
}

export default MenuText

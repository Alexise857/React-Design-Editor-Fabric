import { useState } from "react"
import { useCanvasContext } from "@components/Canvas/hooks"
import styled from "styled-components"
import {
  Menu,
  MenuButton,
  MenuList,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
  ButtonGroup,
  Box,
  MenuItem,
} from "@chakra-ui/react"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;
  padding: 0 1rem;
  position: relative;
  height: 48px;
`

type Flip = "flipX" | "flipY"

function MenuImage() {
  const { activeObject, canvas } = useCanvasContext()

  const updateFlip = (prop: Flip) => {
    if (activeObject) {
      activeObject.set(prop, !activeObject[prop])
      canvas?.requestRenderAll()
    }
  }
  return (
    <Container>
      <ButtonGroup spacing={0}>
        <Menu arrowPadding={10}>
          <MenuButton fontFamily="Rubik" fontWeight="400">
            Flip
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => updateFlip("flipX")}>
              <div style={{ display: "grid", gridTemplateColumns: "30px 1fr" }}>
                <FlipXIcon /> Flip horizontal
              </div>
            </MenuItem>
            <MenuItem onClick={() => updateFlip("flipY")}>
              <div style={{ display: "grid", gridTemplateColumns: "30px 1fr" }}>
                <FlipYIcon /> Flip vertical
              </div>
            </MenuItem>
          </MenuList>
        </Menu>
        <Button background="white" fontFamily="Rubik" fontWeight="400">
          Crop
        </Button>
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
              <Slider aria-label="slider-ex-1" defaultValue={30}>
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

function FlipXIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M15.97 15.25h-2.72c-5.3 0-9.5-2.15-9.5-4.5s4.2-4.5 9.5-4.5c3.03 0 5.82.7 7.62 1.86a.75.75 0 1 0 .81-1.26c-2.06-1.33-5.13-2.1-8.43-2.1-6.02 0-11 2.55-11 6s4.98 6 11 6h2.8l-2.3 2.3a.75.75 0 1 0 1.07 1.05l2.83-2.82c.68-.69.68-1.8 0-2.48l-2.83-2.83a.75.75 0 0 0-1.06 1.06l2.21 2.22z"
      ></path>
    </svg>
  )
}

function FlipYIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M15.25 8.35v2.4c0 5.3-2.15 9.5-4.5 9.5s-4.5-4.2-4.5-9.5c0-3.03.7-5.82 1.86-7.62a.75.75 0 1 0-1.26-.81c-1.33 2.06-2.1 5.13-2.1 8.43 0 6.02 2.55 11 6 11s6-4.98 6-11V8.27l2.3 2.3A.75.75 0 1 0 20.1 9.5l-2.82-2.83a1.75 1.75 0 0 0-2.48 0L11.97 9.5a.75.75 0 1 0 1.06 1.06l2.22-2.22z"
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

export default MenuImage

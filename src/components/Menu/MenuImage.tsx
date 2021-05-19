import { useCanvasContext } from "@components/Canvas/hooks"
import styled from "styled-components"
import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  ButtonGroup,
  MenuItem,
} from "@chakra-ui/react"
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
      <CommonMenu />
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

export default MenuImage

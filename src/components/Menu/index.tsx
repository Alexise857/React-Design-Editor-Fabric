import { useCanvasContext } from "@components/Canvas/hooks"
import styled from "styled-components"
import MenuObject from "./MenuObject"
import DefaultMenu from "./DefaultMenu"
import MenuImage from "./MenuImage"
import MenuText from "./MenuText"

const Container = styled.div`
  height: 48px;
  background: #ffffff;
  border-bottom: 1px solid rgba(57, 76, 96, 0.15);
  display: flex;
`
function Menu() {
  const { activeObject } = useCanvasContext()

  if (!activeObject) {
    return (
      <Container>
        <DefaultMenu />
      </Container>
    )
  }

  return (
    <Container>
      {activeObject.type === "path" || activeObject.groupType === "path" ? (
        <MenuObject />
      ) : (
        <></>
      )}
      {activeObject.type === "image" && <MenuImage />}
      {activeObject.type === "textbox" && <MenuText />}
    </Container>
  )
}

export default Menu

import { useCanvasContext } from "@components/Canvas/hooks"
import styled from "styled-components"
import MenuObject from "./MenuObject"
import DefaultObject from "./DefaultObject"

const Container = styled.div`
  height: 52px;
  background: #ffffff;
  border-bottom: 1px solid rgba(57, 76, 96, 0.15);
  display: flex;
`
function Menu() {
  const { activeObject } = useCanvasContext()

  if (!activeObject) {
    return (
      <Container>
        <DefaultObject />
      </Container>
    )
  }
  return <Container>{activeObject.type === "path" && <MenuObject />}</Container>
}

export default Menu

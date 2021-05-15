import { useCanvasContext } from "@/hooks"
import styled from "styled-components"
import MenuObject from "./MenuObject"
const Container = styled.div`
  height: 52px;
  background: #ffffff;
  border-bottom: 1px solid rgba(57, 76, 96, 0.15);
`
function Menu() {
  const { activeObject } = useCanvasContext()

  if (!activeObject) {
    return <Container></Container>
  }
  return <Container>{activeObject.type === "path" && <MenuObject />}</Container>
}

export default Menu

import styled from "styled-components"
import { Button } from "@chakra-ui/react"
import { useCanvasContext } from "../Canvas/hooks"
const Container = styled.div`
  height: 60px;
  border-bottom: 1px solid rgba(57, 76, 96, 0.15);
  flex: none;
`

function Header() {
  const { canvas } = useCanvasContext()
  const downloadImage = () => {
    const data = canvas?.toDataURL({ multiplier: 3 })
    if (data) {
      const a = document.createElement("a")
      a.href = data
      a.download = "drawing.png"
      a.click()
    }
  }
  return (
    <Container>
      <Button onClick={downloadImage}>Download</Button>
    </Container>
  )
}

export default Header

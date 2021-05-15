import styled from "styled-components"
import { useEffect } from "react"
import { fabric } from "fabric"

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`

function Canvas() {
  useEffect(() => {
    new fabric.Canvas("canvas", {
      height: 400,
      width: 600,
      backgroundColor: "#ffffff",
    })
  }, [])
  return (
    <Container>
      <canvas id="canvas"></canvas>
    </Container>
  )
}
export default Canvas

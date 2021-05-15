import styled from "styled-components"
import { useEffect } from "react"
import { fabric } from "fabric"
import { useCanvasContext } from "@/hooks"

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`

function Canvas() {
  const { setCanvas } = useCanvasContext()

  useEffect(() => {
    setCanvas(
      new fabric.Canvas("canvas", {
        height: 400,
        width: 600,
        backgroundColor: "#ffffff",
      })
    )
  }, [setCanvas])
  return (
    <Container>
      <canvas id="canvas"></canvas>
    </Container>
  )
}
export default Canvas

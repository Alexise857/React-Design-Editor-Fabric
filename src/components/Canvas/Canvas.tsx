import { styled } from "baseui"
import { useEffect } from "react"
import { fabric } from "fabric"

const Container = styled("div", {
  display: "flex",
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
})

function Canvas() {
  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
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

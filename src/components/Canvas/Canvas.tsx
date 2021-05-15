import styled from "styled-components"
import { useEffect } from "react"
import { fabric } from "fabric"
import { useCanvasContext } from "./hooks"
import { Scrollbars } from "react-custom-scrollbars"
import {
  useCustomizationHandler,
  useEventsHandler,
  useGuidelinesHandler,
  useZoomHandler,
} from "./handlers"

const Container = styled.div`
  display: flex;
  flex: 1;
`

function Canvas() {
  const { setCanvas } = useCanvasContext()
  useCustomizationHandler()
  useEventsHandler()
  useZoomHandler()
  useGuidelinesHandler()
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
      <div style={{ position: "relative", flex: 1 }}>
        <Scrollbars autoHide>
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              display: "flex",
            }}
          >
            <div
              style={{
                margin: "auto",
                flex: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  padding: "2rem",
                }}
              >
                <canvas id="canvas"></canvas>
              </div>
            </div>
          </div>
        </Scrollbars>
      </div>
    </Container>
  )
}
export default Canvas

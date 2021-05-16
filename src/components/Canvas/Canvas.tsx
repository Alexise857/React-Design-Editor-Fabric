import styled from "styled-components"
import { useEffect, useRef } from "react"
import { fabric } from "fabric"
import { useCanvasContext } from "./hooks"
import { Scrollbars } from "react-custom-scrollbars"
import ResizeObserver from "resize-observer-polyfill"
import {
  useCustomizationHandler,
  useEventsHandler,
  useGuidelinesHandler,
  useZoomHandler,
} from "./handlers"

import "fabric-history"

const Container = styled.div`
  display: flex;
  flex: 1;
`

function Canvas() {
  const { setCanvas, setAreaDimension } = useCanvasContext()
  const containerRef = useRef<any>()
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

  useEffect(() => {
    const initialHeight = containerRef.current?.clientHeight
    const intialWidth = containerRef.current?.clientWidth
    setAreaDimension({ width: intialWidth! - 32, height: initialHeight! - 32 })
    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        const { width = intialWidth, height = initialHeight } =
          (entries[0] && entries[0].contentRect) || {}
        setAreaDimension({ width: width! - 32, height: height! - 32 })
      }
    )
    resizeObserver.observe(containerRef.current!)
    return () => {
      resizeObserver.unobserve(containerRef.current!)
    }
  }, [])

  return (
    <Container>
      <div ref={containerRef} style={{ position: "relative", flex: 1 }}>
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
                  padding: "1rem",
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

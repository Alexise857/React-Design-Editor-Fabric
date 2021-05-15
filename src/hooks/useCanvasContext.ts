import { useContext } from "react"
import Context from "@/contexts/canvas"

function useCanvasContext() {
  const {
    zoomRatio,
    setZoomRatio,
    setCanvas,
    canvas,
    activeObject,
    setActiveObject,
  } = useContext(Context)

  return {
    zoomRatio,
    setZoomRatio,
    setCanvas,
    canvas,
    activeObject,
    setActiveObject,
  }
}

export default useCanvasContext

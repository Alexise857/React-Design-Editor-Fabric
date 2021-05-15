import { useContext } from "react"
import { CanvasContext } from "@components/Canvas"

function useCanvasContext() {
  const {
    zoomRatio,
    setZoomRatio,
    setCanvas,
    canvas,
    activeObject,
    setActiveObject,
    formatSize,
    setFormatSize,
    areaDimension,
    setAreaDimension,
  } = useContext(CanvasContext)

  return {
    zoomRatio,
    setZoomRatio,
    setCanvas,
    canvas,
    activeObject,
    setActiveObject,
    formatSize,
    setFormatSize,
    areaDimension,
    setAreaDimension,
  }
}

export default useCanvasContext

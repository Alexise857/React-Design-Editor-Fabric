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
    contextMenu,
    setContextMenu,
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
    contextMenu,
    setContextMenu,
  }
}

export default useCanvasContext

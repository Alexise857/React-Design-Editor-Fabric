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
    clipBoards,
    setClipBoards,
    grid,
    setGrid,
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
    clipBoards,
    setClipBoards,
    grid,
    setGrid,
  }
}

export default useCanvasContext

import { useCallback, useEffect } from "react"
import { useCanvasContext } from "@components/Canvas/hooks"

function useZoomHandler() {
  const { canvas, zoomRatio, formatSize } = useCanvasContext()

  const updateZoom = useCallback(
    (zoomRatio: number) => {
      if (canvas) {
        const width = formatSize.width * zoomRatio
        const height = formatSize.height * zoomRatio

        canvas.setHeight(height).setWidth(width)
        canvas.setZoom(zoomRatio)
      }
    },
    [canvas, formatSize]
  )

  useEffect(() => {
    updateZoom(zoomRatio)
  }, [zoomRatio])
}

export default useZoomHandler

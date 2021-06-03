//@ts-nocheck
import { fabric } from "fabric"
import { useCallback, useEffect } from "react"
import { useCanvasContext } from "@components/Canvas/hooks"

function useGridHandler() {
  const { canvas, grid, formatSize } = useCanvasContext()
  //   const sizeFormat = { width: 600, height: 400 }

  useEffect(() => {
    const snapToGrid = (options) => {
      if (grid.snap) {
        if (
          Math.round((options.target.left / grid.size) * 4) % 4 == 0 &&
          Math.round((options.target.top / grid.size) * 4) % 4 == 0
        ) {
          options.target
            .set({
              left: Math.round(options.target.left / grid.size) * grid.size,
              top: Math.round(options.target.top / grid.size) * grid.size,
            })
            .setCoords()
        }
      }
    }

    if (canvas) {
      canvas.on("object:moving", snapToGrid)
    }
    return () => {
      if (canvas) {
        canvas.off("object:moving", snapToGrid)
      }
    }
  }, [canvas, grid])

  const drawGrid = useCallback(() => {
    if (canvas) {
      const gridGroupOpts = {
        opacity: 0.6,
        selectable: false,
        hoverCursor: "default",
        originX: "center",
        originY: "center",
      }

      const gridGroup = new fabric.Group(null, gridGroupOpts)
      // draw vertical lines
      for (var i = 0; i < formatSize.width / grid.size; i++) {
        gridGroup.addWithUpdate(
          new fabric.Line(
            [i * grid.size, 0, i * grid.size, formatSize.height],
            {
              stroke: "#ccc",
              selectable: false,
            }
          )
        )
      }
      // draw horizontal lines
      for (var i = 0; i < formatSize.height / grid.size; i++) {
        gridGroup.addWithUpdate(
          new fabric.Line([0, i * grid.size, formatSize.width, i * grid.size], {
            stroke: "#ccc",
            selectable: false,
          })
        )
      }

      gridGroup.name = grid.name

      canvas.add(gridGroup)
    }
  }, [canvas, grid, formatSize])

  const removeGrid = useCallback(() => {
    if (canvas) {
      const [currentGrid] = canvas
        .getObjects()
        .filter((obj) => obj.name === grid.name)
      if (currentGrid) {
        canvas.remove(currentGrid)
      }
    }
  }, [canvas, grid])

  useEffect(() => {
    if (grid.enabled) {
      drawGrid()
    } else {
      removeGrid()
    }
  }, [canvas, grid, formatSize])
}

export default useGridHandler

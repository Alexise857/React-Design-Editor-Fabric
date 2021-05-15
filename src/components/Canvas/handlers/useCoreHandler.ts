import { useCallback } from "react"
import { useCanvasContext } from "@components/Canvas/hooks"
import CanvasObjects, {
  CanvasObjectType,
} from "@components/Canvas/CanvasObjects"
import { FormatSize } from "@components/Canvas/CanvasContext"

function useCoreHandler() {
  const { canvas, setActiveObject, setFormatSize, areaDimension } =
    useCanvasContext()

  /**
   * Update format size
   */
  const updateFormatSize = useCallback(
    (options: FormatSize & { zoomRatio: number }) => {
      setFormatSize({ width: options.width, height: options.height })
      if (canvas) {
        const width = options.width * options.zoomRatio
        const height = options.height * options.zoomRatio

        canvas.setHeight(height).setWidth(width)
        canvas.setZoom(options.zoomRatio)
      }
    },
    [canvas]
  )

  /**
   * Calculate zoom fit ratio
   */
  const calculateZoomFitRatio = useCallback(
    (formatSize: FormatSize) => {
      const { width: areaWidth, height: areaHeight } = areaDimension
      const { width: canvasWidth, height: canvasHeight } = formatSize

      const isHeightGreater = canvasHeight > areaHeight
      const isWidthGreater = canvasWidth > areaWidth

      let fitZoomRatio = 1
      if (isHeightGreater && !isWidthGreater) {
        fitZoomRatio = areaHeight / canvasHeight
      } else if (isWidthGreater && !isHeightGreater) {
        fitZoomRatio = areaWidth / canvasWidth
      } else {
        const heightRatio = areaHeight / canvasHeight
        const widthRatio = areaWidth / canvasWidth
        fitZoomRatio = widthRatio < heightRatio ? widthRatio : heightRatio
      }
      return fitZoomRatio
    },
    [areaDimension]
  )

  /**
   * Add object to canvas
   */
  const addObject = useCallback(
    async (options) => {
      const { type, ...objectOptions } = options
      const object = await CanvasObjects[type as CanvasObjectType].create(
        objectOptions
      )
      if (canvas) {
        if (object.type != "textbox") {
          object.scaleToHeight(160)
        }
        canvas.add(object)
        object.center()
        canvas.setActiveObject(object)
        setActiveObject(object)
      }
    },
    [canvas]
  )

  /**
   * importObjects
   */

  const importObject = useCallback(
    async (options) => {
      const { type, ...objectOptions } = options
      const object = await CanvasObjects[type as CanvasObjectType].create(
        objectOptions
      )
      console.log(object)
      if (canvas) {
        canvas.add(object)
        canvas.setActiveObject(object)
        setActiveObject(object)
      }
    },
    [canvas]
  )
  /**
   * Update object
   */
  const updateObject = useCallback(() => {}, [])

  /**
   * Remove object
   */
  const removeObject = useCallback(() => {}, [])

  /**
   * Get object
   */
  const getObject = useCallback(() => {}, [])

  const setCanvasBackgroundColor = useCallback(
    (color) => {
      if (canvas) {
        canvas.setBackgroundColor(color, () => {
          canvas.requestRenderAll()
        })
      }
    },
    [canvas]
  )

  return {
    addObject,
    updateObject,
    removeObject,
    getObject,
    setCanvasBackgroundColor,
    updateFormatSize,
    calculateZoomFitRatio,
    importObject,
  }
}

export default useCoreHandler

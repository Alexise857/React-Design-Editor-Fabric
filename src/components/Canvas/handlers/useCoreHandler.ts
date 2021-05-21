import { useCallback } from "react"
import { useCanvasContext } from "@components/Canvas/hooks"
import { loadImageFromURL } from "@components/Canvas/utils/canvas"
import { FormatSize } from "@components/Canvas/CanvasContext"
import CanvasObjects, {
  CanvasObjectType,
} from "@components/Canvas/CanvasObjects"
import { fabric } from "fabric"

function useCoreHandler() {
  const {
    canvas,
    activeObject,
    setActiveObject,
    setFormatSize,
    areaDimension,
  } = useCanvasContext()

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
   * Clone the selected object
   */

  const cloneOject = useCallback(() => {
    // console.log("cloning")
    if (canvas) {
      activeObject?.clone((clone: fabric.Object) => {
        clone.set({
          left: activeObject?.left! + 10,
          top: activeObject?.top! + 10,
          ...(activeObject.groupType && { groupType: activeObject.groupType }),
        })
        canvas.add(clone)
        canvas.setActiveObject(clone)
        canvas.requestRenderAll()
      })
    }
  }, [canvas, activeObject])

  const deleteObject = useCallback(() => {
    if (canvas && activeObject) {
      canvas.remove(activeObject as fabric.Object)
    }
  }, [canvas, activeObject])
  /**
   * Update selected object
   */
  const updateObject = useCallback(
    (key, value) => {
      if (canvas && activeObject) {
        activeObject.set(key, value)
        canvas.requestRenderAll()
      }
    },
    [canvas, activeObject]
  )

  /**
   * Import template
   */
  const isValidCanvasOption = (options: any) => {
    if (
      options.width &&
      typeof options.width === "number" &&
      options.height &&
      typeof options.height === "number"
    ) {
      return true
    }
    return false
  }
  const importTemplate = useCallback(
    async ({ options, canvasJSON }: any) => {
      try {
        const canvasOptions = JSON.parse(options)
        if (canvas && isValidCanvasOption(canvasOptions)) {
          canvas.clear()
          canvas.setBackgroundColor("#ffffff", () => canvas.requestRenderAll())
          if (options && canvasJSON) {
            const dimension = {
              width: canvasOptions.width,
              height: canvasOptions.height,
            }
            const zoomFitRatio = calculateZoomFitRatio(dimension)
            updateFormatSize({ ...dimension, zoomRatio: zoomFitRatio })
            for (const objectOption of canvasJSON.objects) {
              if (objectOption.type === "image") {
                const object = await loadImageFromURL(objectOption.src)
                object.set({ ...objectOption })
                canvas?.add(object)
              }
              if (objectOption.type === "path") {
                fabric.util.enlivenObjects(
                  [objectOption],
                  (objects: fabric.Object[]) => {
                    for (const object of objects) {
                      canvas.add(object)
                    }
                  },
                  ""
                )
              }

              if (objectOption.type === "rect") {
                const object = new fabric.Rect(objectOption)
                canvas.add(object)
              }

              if (objectOption.type === "textbox") {
                const object = new fabric.Textbox(objectOption.text, {
                  ...objectOption,
                })
                canvas.add(object)
              }

              if (objectOption.type === "group") {
                fabric.util.enlivenObjects(
                  [objectOption],
                  (objects: fabric.Object[]) => {
                    for (const object of objects) {
                      canvas.add(object)
                    }
                  },
                  ""
                )
              }
            }
          }
        }
      } catch (err) {
        console.error("ERROR IMPORTING TEMPLATE")
      }
    },
    [canvas]
  )

  /**
   * setCanvasBackgroundColor
   */

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
    cloneOject,
    deleteObject,
    setCanvasBackgroundColor,
    updateFormatSize,
    calculateZoomFitRatio,
    importTemplate,
    updateObject,
  }
}

export default useCoreHandler

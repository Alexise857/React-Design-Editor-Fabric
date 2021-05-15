import { useCallback } from "react"
import { useCanvasContext } from "@components/Canvas/hooks"
import CanvasObjects, {
  CanvasObjectType,
} from "@components/Canvas/CanvasObjects"
import { withDefaultColorScheme } from "@chakra-ui/react"

function useCoreHandler() {
  const { canvas, setActiveObject } = useCanvasContext()
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
  }
}

export default useCoreHandler

import { useCallback } from "react"
import { useCanvasContext } from "@/hooks"
import CanvasObjects, {
  CanvasObjectType,
} from "@components/Canvas/CanvasObjects"

function useCoreHandler() {
  const { canvas, setActiveObject } = useCanvasContext()
  /**
   * Add object to canvas
   */
  const addObject = useCallback(
    async (options) => {
      const object = await CanvasObjects[
        options.type as CanvasObjectType
      ].create(options)
      if (canvas) {
        object.scaleToHeight(160)
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

  return {
    addObject,
    updateObject,
    removeObject,
    getObject,
  }
}

export default useCoreHandler

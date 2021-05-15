import { FC, createContext, useState } from "react"

interface CanvasContext {
  zoomRatio: number
  setZoomRatio: React.Dispatch<React.SetStateAction<number>>
  zoomFitRatio: number
  setZoomFitRatio: React.Dispatch<React.SetStateAction<number>>
  canvas: fabric.Canvas | null
  setCanvas: (canvas: fabric.Canvas) => void
  activeObject: fabric.Object | null
  setActiveObject: (object: fabric.Object | null) => void
}

export const Context = createContext<CanvasContext>({
  zoomRatio: 1,
  setZoomRatio: () => {},
  zoomFitRatio: 1,
  setZoomFitRatio: () => {},
  canvas: null,
  setCanvas: () => {},
  activeObject: null,
  setActiveObject: () => {},
})

export const CanvasProvider: FC = ({ children }) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null)
  const [zoomRatio, setZoomRatio] = useState(1)
  const [zoomFitRatio, setZoomFitRatio] = useState(1)
  const context = {
    canvas,
    setCanvas,
    activeObject,
    setActiveObject,
    zoomRatio,
    setZoomRatio,
    zoomFitRatio,
    setZoomFitRatio,
  }

  return <Context.Provider value={context}>{children}</Context.Provider>
}

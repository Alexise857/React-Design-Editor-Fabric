import { FC, createContext, useState } from "react"

interface ICanvasContext {
  zoomRatio: number
  setZoomRatio: React.Dispatch<React.SetStateAction<number>>
  zoomFitRatio: number
  setZoomFitRatio: React.Dispatch<React.SetStateAction<number>>
  canvas: fabric.Canvas | null
  setCanvas: (canvas: fabric.Canvas) => void
  activeObject: fabric.Object | null
  setActiveObject: (object: fabric.Object | null) => void
  formatSize: FormatSize
  setFormatSize: (option: FormatSize) => void
  areaDimension: AreaDimension
  setAreaDimension: (option: AreaDimension) => void
}

interface Dimension {
  width: number
  height: number
}
export type FormatSize = Dimension
export type AreaDimension = Dimension

export const CanvasContext = createContext<ICanvasContext>({
  zoomRatio: 1,
  setZoomRatio: () => {},
  zoomFitRatio: 1,
  setZoomFitRatio: () => {},
  canvas: null,
  setCanvas: () => {},
  activeObject: null,
  setActiveObject: () => {},
  formatSize: { width: 0, height: 0 },
  setFormatSize: () => {},
  areaDimension: { width: 0, height: 0 },
  setAreaDimension: () => {},
})

export const CanvasProvider: FC = ({ children }) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null)
  const [zoomRatio, setZoomRatio] = useState(1)
  const [zoomFitRatio, setZoomFitRatio] = useState(1)
  const [formatSize, setFormatSize] = useState<FormatSize>({
    height: 400,
    width: 600,
  })
  const [areaDimension, setAreaDimension] = useState<AreaDimension>({
    height: 400,
    width: 600,
  })
  const context = {
    canvas,
    setCanvas,
    activeObject,
    setActiveObject,
    zoomRatio,
    setZoomRatio,
    zoomFitRatio,
    setZoomFitRatio,
    formatSize,
    setFormatSize,
    areaDimension,
    setAreaDimension,
  }

  return (
    <CanvasContext.Provider value={context}>{children}</CanvasContext.Provider>
  )
}

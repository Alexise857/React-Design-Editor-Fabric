import { fabric } from "fabric"

export type CanvasObjectType = "path" | "image"

export interface CanvasObjectOption {
  type: string
  path: string
}

const CanvasObjects = {
  path: {
    create: (options: any) =>
      Promise.resolve<fabric.Object>(new fabric.Path(options.path)),
  },
  image: {
    create: (options: any) =>
      new Promise<fabric.Object>((resolve) => {
        fabric.Image.fromURL(options.url, (image) => {
          resolve(image)
        })
      }),
  },
  textbox: {
    create: (options: any) => {
      const { text, ...textOptions } = options
      return Promise.resolve<fabric.Textbox>(
        new fabric.Textbox(text, textOptions)
      )
    },
  },
}

export default CanvasObjects

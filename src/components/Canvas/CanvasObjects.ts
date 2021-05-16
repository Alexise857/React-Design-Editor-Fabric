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
  imagxe: {
    create: (options: any) => {
      return new Promise<fabric.Object>((resolve) => {
        fabric.Image.fromURL(options.url, (image) => {
          resolve(image)
        })
      })
    },
  },
  image: {
    create: (obj: any) => {
      const image = new Image()
      if (obj.src) {
        image.src = obj.src
      }
      const object = new fabric.Image(image, {
        ...obj,
      })
      return Promise.resolve(object)
    },
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

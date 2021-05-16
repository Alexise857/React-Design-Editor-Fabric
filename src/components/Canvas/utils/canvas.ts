import { fabric } from "fabric"

export const loadImageFromURL = (url: string) => {
  return new Promise<fabric.Image>((resolve) => {
    fabric.Image.fromURL(url, (img) => resolve(img))
  })
}

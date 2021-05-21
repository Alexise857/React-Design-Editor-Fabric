import axios from "axios"
import { ITextStyle } from "@store/reducers/text-style/types"
import { ITemplate } from "@/store/reducers/templates/types"
import {
  IWordArt,
  IWordArtCategory,
  IWordArtSubcategory,
} from "@/store/reducers/wordarts/types"
import _ from "lodash"

const ADONIS_APP = "http://localhost:3333"
const API_URL = "http://165.227.50.244:1337"
const PIXABAY_URL = "https://pixabay.com/api/"
const TEMPLATES_URL = ADONIS_APP + "/api/templates"
const PIXABAY_KEY = "20824871-7548337191755cbbef05230ed"
const SERVER_CANVAS_SAVE = ADONIS_APP + "/api/save-canvas"
const SERVER_URL = "http://165.227.50.244/designer/"

export function getTemplates(): Promise<ITemplate[]> {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/templates`)
      .then((response) => {
        const items = response.data
        const templates = items.map((item: any) => {
          const template = {
            id: item.id,
            name: item.name,
            category: item.category,
            image: SERVER_URL + "templates/" + item.path + ".png",
            path: item.path,
            subcategory: {},
            createdAt: item.created_at,
            updatedAt: item.updated_at,
          }
          const prevSubcategory = item.subcategory
          if (prevSubcategory && Object.keys(prevSubcategory).length > 0) {
            const subcategory = {
              id: prevSubcategory.id,
              name: prevSubcategory.name,
              image: prevSubcategory.image,
              subcategory: prevSubcategory.subcategory,
              createdAt: prevSubcategory.created_at,
              updatedAt: prevSubcategory.updated_at,
            }
            template.subcategory = subcategory
          }
          return template
        })
        resolve(templates)
      })
      .catch((err) => reject(err))
  })
}

export function getTextStyles(): Promise<ITextStyle[]> {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/textstyles`)
      .then((response) => {
        const items = response.data
        const textStyles = items.map((item: any) => ({
          id: item.id,
          json: item.json,
          svg: item.svg,
          updatedAt: item.updated_at,
          createdAt: item.created_at,
        }))
        resolve(textStyles)
      })
      .catch((err) => reject(err))
  })
}

export function deleteTextStyles() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/templates`)
      .then((data) => {})
      .catch((err) => {})
  })
}

export function getWordArts(): Promise<IWordArt[]> {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/wordarts?_limit=500`)
      .then((response) => {
        const items = response.data
        resolve(items)
      })
      .catch((err) => reject(err))
  })
}

export function getWordArtSubcategories(): Promise<IWordArtSubcategory[]> {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/wordarts?_limit=500`)
      .then((response) => {
        const items = response.data
        let wordArtSubcategories: IWordArtSubcategory[] = []
        items.forEach((item: any) => {
          if (item.wordartsubcategory != null) {
            wordArtSubcategories.push(item.wordartsubcategory)
          }
        })
        const uniqueWordArtSubcategories = _.uniqBy(
          wordArtSubcategories,
          (item) => item.id
        )

        resolve(uniqueWordArtSubcategories)
      })
      .catch((err) => reject(err))
  })
}

export function getWordArtCategories(): Promise<IWordArtCategory[]> {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/wordartcategories`)
      .then((response) => {
        const items = response.data
        const wordArtCategories = items.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
            wordArts: item.wordarts,
            wordArtSubcategories: item.wordartsubcategories,
            updatedAt: item.updated_at,
            createdAt: item.created_at,
          }
        })
        resolve(wordArtCategories)
      })
      .catch((err) => reject(err))
  })
}

export function getTemplateObject(templateid: any, jsonpath: any) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${SERVER_URL}/gettemplate.php?path=${jsonpath}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => reject(err))
  })
}

export const saveCanvas = async (base64: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(SERVER_CANVAS_SAVE, {
        canvas: base64,
        // @ts-ignore
        content: JSON.stringify(window.canvas.toJSON()),
        // @ts-ignore
        width: window.canvas.width,
        // @ts-ignore
        height: window.canvas.height,
      })
      .then((response) => {
        resolve(response)
      })
      .catch((err) => reject(err))
  })
}

// @ts-ignore
window.KANVAS = () => {
  return {
    // @ts-ignore
    contentString: JSON.stringify(window.canvas.toJSON()),
    // @ts-ignore
    contentJSON: window.canvas.toJSON(),
    // @ts-ignore
    width: window.canvas.width,
    // @ts-ignore
    height: window.canvas.height,
  }
}

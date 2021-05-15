import axios from "axios"
const PIXABAY_URL = "https://pixabay.com/api/"

const PIXABAY_KEY = "20824871-7548337191755cbbef05230ed"

interface PixabayImage {
  id: string
  webformatURL: string
  previewURL: string
}
export function getPixabayImages(query: string): Promise<PixabayImage[]> {
  let encodedWord = query.replace(/\s+/g, "+").toLowerCase()
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${PIXABAY_URL}?key=${PIXABAY_KEY}&q=${encodedWord}&image_type=photo&lang=tr`
      )
      .then((response) => {
        resolve(response.data.hits)
      })
      .catch((err) => reject(err))
  })
}

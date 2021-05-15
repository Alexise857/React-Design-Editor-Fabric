import { useEffect, useState } from "react"
import { Scrollbars } from "react-custom-scrollbars"
import { getPixabayImages } from "@services/pixabay"
import { Input } from "@chakra-ui/react"
import { useDebounce } from "use-debounce"
import PanelContainer from "../../ScrollContainer/ScrollContainer"
import useCoreHandler from "@/components/Canvas/handlers/useCoreHandler"
interface Image {
  id: string
  preview: string
  original: string
}
function PanelImage() {
  const [images, setImages] = useState<Image[]>([])
  const [query, setQuery] = useState("")
  const [value] = useDebounce(query, 1500)
  const { addObject } = useCoreHandler()
  useEffect(() => {
    getImages("top")
  }, [])

  useEffect(() => {
    getImages(value)
  }, [value])

  const handleChange = (event: any) => setQuery(event.target.value)

  const getImages = async (query: string) => {
    const dataImages = await getPixabayImages(query)
    const images = dataImages.map((di) => ({
      id: di.id,
      preview: di.previewURL,
      original: di.webformatURL,
    }))
    setImages(images)
  }

  const addObjectToCanvas = (url: string) => {
    const options = {
      type: "image",
      url,
    }
    addObject(options)
    // fabric.Image.fromURL(url, (img) => {
    //   if (canvas) {
    //     img.scaleToHeight(200)
    //     canvas.add(img)
    //     img.center()
    //   }
    // })
  }

  return (
    <PanelContainer>
      <Scrollbars autoHide>
        <div
          style={{
            padding: "2rem 2rem 0",
          }}
        >
          <div
            style={{
              backgroundColor: "rebeccapurple",
              display: "block",
            }}
          >
            <Input
              color="#333"
              background="#fff"
              value={query}
              onChange={handleChange}
              placeholder="Search images"
            />
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            padding: "2rem",
          }}
        >
          {images.map((img) => (
            <div
              key={img.id}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => addObjectToCanvas(img.original)}
            >
              <img width="100%" src={img.preview} alt="preview" />
            </div>
          ))}
        </div>
      </Scrollbars>
    </PanelContainer>
  )
}

export default PanelImage

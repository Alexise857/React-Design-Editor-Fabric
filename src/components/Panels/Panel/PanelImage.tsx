import styled from "styled-components"
import { useEffect, useState } from "react"
import { Scrollbars } from "react-custom-scrollbars"
import { getPixabayImages } from "@services/pixabay"

const Container = styled.div`
  color: #ffffff;
  display: flex;
  flex: 1;
`
interface Image {
  id: string
  preview: string
  original: string
}
function PanelImage() {
  const [images, setImages] = useState<Image[]>([])

  useEffect(() => {
    getImages("top")
  }, [])

  const getImages = async (query: string) => {
    const dataImages = await getPixabayImages(query)

    const images = dataImages.map((di) => ({
      id: di.id,
      preview: di.previewURL,
      original: di.webformatURL,
    }))
    setImages(images)
  }

  return (
    <Container>
      <div style={{ position: "relative", flex: 1 }}>
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
          }}
        >
          <Scrollbars autoHide>
            <div
              style={{
                height: "100px",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  backgroundColor: "rebeccapurple",
                  height: "300px",
                  display: "block",
                }}
              >
                Hello
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
                <img width="100%" key={img.id} src={img.preview} />
              ))}
            </div>
          </Scrollbars>
        </div>
      </div>
    </Container>
  )
}

export default PanelImage
